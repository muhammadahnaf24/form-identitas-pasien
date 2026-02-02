import jsPDF from "jspdf";

const formatTanggalIndo = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch (e) {
    return dateString;
  }
};

const getImageData = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = (e) => {
      console.warn(e);
      resolve(null);
    };
    img.src = url;
  });
};

export const generateIdentitasPdf = async (data, logoPath) => {
  const doc = new jsPDF("p", "mm", "a4");

  const marginLeft = 20;
  const marginRight = 20;
  const marginTop = 20;

  const pageWidth = 210;
  const contentWidth = pageWidth - marginLeft - marginRight;
  const startX = marginLeft;
  const endX = pageWidth - marginRight;

  if (logoPath) {
    const logoData = await getImageData(logoPath);
    if (logoData) {
      doc.addImage(logoData, "PNG", startX, marginTop, 20, 20);
    }
  }

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.text("RS. KRISTEN NGESTI", startX + 25, marginTop + 6);
  doc.text("WALUYO", startX + 25, marginTop + 12);

  const boxWidth = 75;
  const boxX = endX - boxWidth;
  const boxY = marginTop;

  doc.setLineWidth(0.3);
  doc.rect(boxX, boxY, boxWidth, 22);

  doc.setFontSize(9);
  doc.setFont("times", "normal");

  const headerLabels = [
    { label: "Nama", val: (data.namaLengkap || "").toUpperCase() },
    { label: "NIK", val: data.noKtp || "-" },
    { label: "No. RM", val: data.noRm || "-" },
    { label: "Tgl Lahir", val: formatTanggalIndo(data.tanggalLahir) },
  ];

  let headerY = boxY + 5;
  const headLabelX = boxX + 2;
  const headTitikX = boxX + 22;
  const headValX = boxX + 24;
  const headValMaxW = boxWidth - 26;

  headerLabels.forEach((item) => {
    doc.text(item.label, headLabelX, headerY);
    doc.text(":", headTitikX, headerY);
    const splitVal = doc.splitTextToSize(item.val, headValMaxW);
    doc.text(splitVal, headValX, headerY);
    headerY += 4.5;
  });

  const lineY = marginTop + 26;
  doc.setLineWidth(0.5);
  doc.line(startX, lineY, endX, lineY);
  doc.setLineWidth(0.2);
  doc.line(startX, lineY + 1, endX, lineY + 1);

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const titleY = lineY + 12;
  doc.text("FORMULIR IDENTITAS PASIEN", pageWidth / 2, titleY, {
    align: "center",
  });

  doc.setLineWidth(0.3);
  doc.line(pageWidth / 2 - 40, titleY + 1, pageWidth / 2 + 40, titleY + 1);

  doc.setFontSize(10);
  doc.setFont("times", "normal");

  let y = titleY + 12;
  const gap = 6;

  const labelX = startX + 5;
  const titikX = startX + 45;
  const valueX = startX + 48;
  const maxValWidth = endX - valueX;

  const writeRow = (label, value) => {
    doc.setFont("times", "normal");
    doc.text(label, labelX, y);

    doc.setFont("times", "normal");
    doc.text(":", titikX, y);

    const splitText = doc.splitTextToSize(value || "-", maxValWidth);
    doc.text(splitText, valueX, y);

    const lines = splitText.length;
    y += lines * 5 + (gap - 5);
  };

  writeRow("No. Registrasi", data.noReg);
  writeRow("Nama Lengkap", (data.namaLengkap || "").toUpperCase());
  writeRow("NIK", data.noKtp);
  writeRow(
    "Tempat / Tgl Lahir",
    `${data.tempatLahir}, ${formatTanggalIndo(data.tanggalLahir)}`,
  );

  let partsUsia = [];
  if (data.umurTahun && data.umurTahun != 0)
    partsUsia.push(`${data.umurTahun} Tahun`);
  if (data.umurBulan && data.umurBulan != 0)
    partsUsia.push(`${data.umurBulan} Bulan`);
  const stringUsia = partsUsia.length > 0 ? partsUsia.join(" ") : "-";

  writeRow("Usia", stringUsia);
  writeRow("Jenis Kelamin", data.jenisKelamin);
  writeRow("Status Perkawinan", data.status);
  writeRow("Agama", data.agama);
  writeRow("Pendidikan Terakhir", data.pendidikan);
  writeRow("Pekerjaan", data.pekerjaan);

  const alamatFull = `${data.alamat}, Desa ${data.desa}, Kec. ${data.kecamatan}, ${data.kabupaten} - ${data.provinsi}`;
  writeRow("Alamat Domisili", alamatFull);

  writeRow("No. Telepon / HP", data.noHp);

  y += 2;

  doc.setLineDash([1, 1], 0);
  doc.setLineWidth(0.1);
  doc.line(startX, y, endX, y);
  doc.setLineDash([]);

  y += 8;

  doc.setFont("times", "bold");
  doc.text("DATA PENANGGUNG JAWAB / KONTAK DARURAT", labelX, y);
  y += 8;

  doc.setFont("times", "normal");
  writeRow("Nama Lengkap", data.daruratNama);
  writeRow("Hubungan Pasien", data.hubungan);
  writeRow("Alamat", data.daruratAlamat);
  writeRow("No. Telp / HP", `${data.daruratHp1} / ${data.daruratHp2 || "-"}`);

  y += 5;

  const statement =
    "                                   Saya yang bertanda tangan di bawah ini menyatakan bahwa data tersebut di atas adalah benar dan dapat dipertanggungjawabkan. Saya bersedia mengikuti segala peraturan dan tata tertib yang berlaku di RS. Kristen Ngesti Waluyo Parakan.";

  doc.setFont("times", "italic");
  doc.setFontSize(9);

  const splitStatement = doc.splitTextToSize(statement, contentWidth - 10);
  const boxStatementHeight = splitStatement.length * 4.5 + 6;

  doc.rect(startX, y, contentWidth, boxStatementHeight);
  doc.text(splitStatement, startX + 5, y + 6);

  doc.setFont("times", "bolditalic");
  doc.text("PERNYATAAN :", startX + 5, y + 6);

  y += boxStatementHeight + 10;

  const dateNow = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  }).format(new Date());

  const ttdCenterX = endX - 40;

  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.text(`Parakan, ${dateNow}`, ttdCenterX, y, { align: "center" });

  y += 5;
  doc.setFont("times", "bold");
  doc.text("Yang Membuat Pernyataan,", ttdCenterX, y, { align: "center" });

  y += 5;

  if (data.tandaTangan) {
    doc.addImage(data.tandaTangan, "PNG", ttdCenterX - 20, y, 40, 20);
  } else {
    y += 20;
  }

  y += 20;

  doc.setLineWidth(0.3);
  doc.line(ttdCenterX - 30, y + 1, ttdCenterX + 30, y + 1);

  doc.text(
    `( ${data.daruratNama || "........................"} )`,
    ttdCenterX,
    y,
    { align: "center" },
  );

  const safeName = (data.namaLengkap || "Pasien").replace(/[^a-zA-Z0-9]/g, "_");
  doc.save(`Identitas_${data.noReg}_${safeName}.pdf`);
};
