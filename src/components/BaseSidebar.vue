<script setup>
import logoImage from "@/assets/logo.png";

const props = defineProps({
  isSidebarOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close-sidebar"]);

const menuItems = [
  { name: "Dashboard", icon: "home", path: "/" },
  {
    name: "Formulir Identitas",
    icon: "clipboard-document-list",
    path: "/identitas",
  },
  {
    name: "Formulir Identitas 2",
    icon: "clipboard-document-list",
    path: "/identitas2",
  },
  {
    name: "Surat Rawat Inap",
    icon: "clipboard-document-list",
    path: "/rawat-inap",
  },
];

const handleItemClick = () => {
  emit("close-sidebar");
};
</script>

<template>
  <div>
    <div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
      <Transition
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isSidebarOpen"
          class="fixed inset-0 bg-gray-900/80"
          @click="$emit('close-sidebar')"
        ></div>
      </Transition>

      <div class="fixed inset-0 flex pointer-events-none">
        <Transition
          enter-active-class="transition ease-in-out duration-300 transform"
          enter-from-class="-translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition ease-in-out duration-300 transform"
          leave-from-class="translate-x-0"
          leave-to-class="-translate-x-full"
        >
          <div
            v-if="isSidebarOpen"
            class="relative mr-16 flex w-full max-w-xs flex-1 pointer-events-auto bg-white"
          >
            <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                class="-m-2.5 p-2.5 text-white"
                @click="$emit('close-sidebar')"
              >
                <span class="sr-only">Close sidebar</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class="flex flex-col h-full w-full overflow-y-auto pb-4">
              <div
                class="h-16 flex items-center gap-3 px-6 border-b border-gray-100 shrink-0"
              >
                <img :src="logoImage" alt="Logo" class="h-8 w-auto" />
                <div>
                  <h1 class="text-sm font-bold text-gray-900 leading-none">
                    Formulir
                  </h1>
                  <p class="text-[10px] text-gray-500 font-medium">
                    RSK Ngesti Waluyo
                  </p>
                </div>
              </div>

              <nav class="flex-1 px-3 py-6 space-y-1">
                <p
                  class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
                >
                  Menu Utama
                </p>

                <router-link
                  v-for="item in menuItems"
                  :key="item.path"
                  :to="item.path"
                  @click="$emit('close-sidebar')"
                  class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  active-class="bg-blue-50 text-blue-700"
                >
                  <svg
                    v-if="item.icon === 'home'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="mr-3 h-5 w-5 shrink-0 group-[.router-link-active]:text-blue-600 text-gray-400 group-hover:text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'user-plus'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="mr-3 h-5 w-5 shrink-0 group-[.router-link-active]:text-blue-600 text-gray-400 group-hover:text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25z"
                    />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'clipboard-document-list'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="mr-3 h-5 w-5 shrink-0 group-[.router-link-active]:text-blue-600 text-gray-400 group-hover:text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'folder'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="mr-3 h-5 w-5 shrink-0 group-[.router-link-active]:text-blue-600 text-gray-400 group-hover:text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'building-office'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="mr-3 h-5 w-5 shrink-0 group-[.router-link-active]:text-blue-600 text-gray-400 group-hover:text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="mr-3 h-5 w-5 shrink-0 group-[.router-link-active]:text-blue-600 text-gray-400 group-hover:text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>

                  {{ item.name }}
                </router-link>
              </nav>

              <div class="border-t border-gray-200 p-4">
                <div class="flex items-center gap-3">
                  <div
                    class="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs"
                  >
                    U
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-700">User</p>
                    <p class="text-xs text-gray-500">Mobile Access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <aside
      class="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col h-screen sticky top-0 left-0 z-20"
    >
      <div class="h-16 flex items-center gap-3 px-6 border-b border-gray-100">
        <img :src="logoImage" alt="Logo" class="h-8 w-auto" />
        <div>
          <h1 class="text-sm font-bold text-gray-900 leading-none">Formulir</h1>
          <p class="text-[10px] text-gray-500 font-medium">RSK Ngesti Waluyo</p>
        </div>
      </div>

      <nav class="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <p
          class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
        >
          Menu Utama
        </p>

        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          active-class="bg-blue-50 text-blue-700"
        >
          <svg
            v-if="item.icon === 'home'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-3 h-5 w-5 shrink-0 group-[.router-link-active]:text-blue-600 text-gray-400 group-hover:text-gray-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <svg
            v-else-if="item.icon === 'user-plus'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-3 h-5 w-5 shrink-0 group-[.router-link-active]:text-blue-600 text-gray-400 group-hover:text-gray-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25z"
            />
          </svg>
          <svg
            v-else-if="item.icon === 'clipboard-document-list'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-3 h-5 w-5 shrink-0 group-[.router-link-active]:text-blue-600 text-gray-400 group-hover:text-gray-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <svg
            v-else-if="item.icon === 'folder'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-3 h-5 w-5 shrink-0 group-[.router-link-active]:text-blue-600 text-gray-400 group-hover:text-gray-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            />
          </svg>
          <svg
            v-else-if="item.icon === 'building-office'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-3 h-5 w-5 shrink-0 group-[.router-link-active]:text-blue-600 text-gray-400 group-hover:text-gray-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-3 h-5 w-5 shrink-0 group-[.router-link-active]:text-blue-600 text-gray-400 group-hover:text-gray-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>

          {{ item.name }}
        </router-link>
      </nav>

      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center gap-3">
          <div
            class="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs"
          >
            U
          </div>
          <div>
            <p class="text-sm font-medium text-gray-700">User</p>
            <p class="text-xs text-gray-500">User</p>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>
