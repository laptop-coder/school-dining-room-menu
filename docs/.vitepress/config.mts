import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'ru-RU',
  title: 'Меню для школьной столовой',
  description: '',
  srcDir: './src',
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
        text: 'Для сотрудников',
        items: [
          { text: 'Для кого этот раздел?', link: '/2-for-staff/01-for-whom.md' },
          { text: 'Начало работы: создание аккаута администратора', link: '/2-for-staff/02-getting-started.md' },
          { text: 'Главная страница администратора', link: '/2-for-staff/03-home-page.md' },
          { text: 'Управление категориями', link: '/2-for-staff/04-categories-management.md' },
          { text: 'Управление блюдами', link: '/2-for-staff/05-dishes-management.md' },
          { text: 'Управление наличием блюд', link: '/2-for-staff/06-dishes-availability.md' },
          { text: 'Фотографии блюд', link: '/2-for-staff/07-dishes-photos.md' },
        ]
      },
      {
        text: 'Для администраторов',
        items: [
          { text: 'Для кого этот раздел?', link: '/3-for-admins/01-for-whom.md' },
          { text: 'Начало работы. Подготовка', link: '/3-for-admins/02-getting-started.md' },
          { text: 'Запуск на сервере', link: '/3-for-admins/03-launch.md' },
          { text: 'CI/CD', link: '/3-for-admins/04-ci-cd.md' },
        ]
      },
      {
        text: 'Для разработчиков',
        items: [
          { text: 'Для кого этот раздел?', link: '/4-for-devs/01-for-whom.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/laptop-coder/school-dining-room-menu' }
    ],

    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Поиск',
            buttonAriaLabel: 'Поиск'
          },
          modal: {
            displayDetails: 'Показать подробности',
            resetButtonTitle: 'Сбросить поиск',
            backButtonTitle: 'Закрыть поиск',
            noResultsText: 'Ничего не найдено по запросу',
            footer: {
              selectText: 'выбрать',
              navigateText: 'перейти',
              closeText: 'закрыть'
            }
          }
        }
      }
    },

    outline: {
      label: 'Содержание',
      level: [2, 3]
    },

    editLink: {
      pattern: 'https://github.com/laptop-coder/school-dining-room-menu/edit/main/docs/src/:path',
      text: 'Редактировать эту страницу на GitHub'
    },

    footer: {
      message: '',
      copyright: '© Лицей № 369, 2025'
    },

    darkModeSwitchLabel: 'Тема',
    lightModeSwitchTitle: 'Переключить на светлую тему',
    darkModeSwitchTitle: 'Переключить на темную тему',
    sidebarMenuLabel: 'Меню',
    returnToTopLabel: 'Вернуться наверх',
  },
})
