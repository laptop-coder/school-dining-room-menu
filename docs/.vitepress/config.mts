import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Меню для школьной столовой",
  description: "",
  srcDir: "./src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Главная страница', link: '/' },
      { text: 'Документация', link: '/1-for-users/01-problem' },
      { text: 'Контакты', link: '/contacts' }
    ],

    sidebar: [
      {
        text: 'Для пользователей',
        items: [
          { text: 'Какую проблему решает проект?', link: '/1-for-users/01-problem.md' },
          { text: 'Как пользоваться сайтом?', link: '/1-for-users/02-using.md' },
        ]
      },
      {
        text: 'Для администраторов',
        items: [
          { text: 'Для кого этот раздел?', link: '/2-for-admins/01-for-whom.md' },
          { text: 'Начало работы: создание аккаута администратора', link: '/2-for-admins/02-getting-started.md' },
          { text: 'Главная страница администратора', link: '/2-for-admins/03-home-page.md' },
          { text: 'Управление категориями', link: '/2-for-admins/04-categories-management.md' },
          { text: 'Управление блюдами', link: '/2-for-admins/05-dishes-management.md' },
          { text: 'Управление наличием блюд', link: '/2-for-admins/06-dishes-availability.md' },
          { text: 'Фотографии блюд', link: '/2-for-admins/07-dishes-photos.md' },
        ]
      },
      {
        text: 'Для разработчиков',
        items: [
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/laptop-coder/school-dining-room-menu' }
    ],
  },
})
