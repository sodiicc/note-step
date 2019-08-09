###Заметки, как в Google keep
	
Приложение позволяет создавать, хранить и редактировать карточки с названием заметки и ее описанием, создавать список из этих карточек-заметок с 

возможностью отмечать выполненные и перемещать их в конец списка.

Рекомендованные системные требования : 1Гб ОЗУ, Intel Pentium 4.

Используется стандартная лицензия [MIT](https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F_MIT).

Использован фрейворк [Bootstrap 4](https://getbootstrap.com/), HTML код должен быть написан с помощью backend-шаблонизатора [JSX](https://learn-reactjs.ru/basics/introduction-to-jsx),
	   
запросы между клиентской и серверной частью производятся с помощью AJAX запросов, сервер подключен к удаленной базе MongoDB.

Авторы : [Василий Цивинский](https://github.com/sodiicc), [Виталий Черный](https://github.com/VitaliiChor), [Татьяна Терещенко](https://github.com/TetianaUkraine).

Василий Цивинский

Frontend:

Базовая архитектура приложения.

Backend-шаблон HTML страницы вывода всех заметок, с возможностью перехода к конкретной заметке при клике на нее.

Backend:

Базовая архитектура приложения, подключение необходимых модулей.

Роут GET /, который возвращает главную HTML страницу со всеми заметками.
	
Виталий Черный
	   
Frontend:

Backend-шаблон HTML страницы создания заметки.

Отправка POST запроса на сервер с созданием заметки. После ответа сервера пользователь будет перенаправлен на главную страницу.

Backend-шаблон HTML страницы детального отображения заметки. На этой странице есть возможность отредактировать и удалить заметку.

Отправка PUT запроса на сервер с отредактированной заметкой. После ответа сервера пользователь будет перенаправлен на главную страницу.

Отправка DELETE запроса на сервер для удаления заметки. После ответа сервера пользователь будет перенаправлен на главную страницу.


Backend:

Роут GET /notes, который отдает HTML страницу с формой создания заметки.

Роут GET /notes/${id}, который отдает HTML страницу детального отображения заметки.

Роут POST /api/notes для создания заметки.

Роут PUT /api/notes/${id} для редактирования заметки.

Роут DELETE /api/notes/${id} для удаления заметки.

Татьяна Терещенко

Frontend:

Бекенд-шаблон HTML страницы создания списка.

Отправка POST запроса на сервер с созданием списка. После ответа сервера пользователь перенаправляется на главную страницу.

Backend-шаблон HTML страницы детального отображения списка. На этой странице должна есть возможность отредактировать и удалить список.

Отправка PUT запроса на сервер с отредактированным списком. После ответа сервера пользователь будет перенаправлен на главную страницу.

Отправка DELETE запроса на сервер для удаления списка. После ответа сервера пользователь будет перенаправлен на главную страницу.


Backend:

Роут GET /lists, который отдает HTML страницу с формой создания списка.

Роут GET /lists/${id}, который отдает HTML страницу детального отображения списка.

Роут GET /api/lists/${id} отображения заметки со списком.

Роут POST /api/lists для добавления нового списка задач с учетом того, что количество позиций в списке - не ограничено и заранее не известно.

Роут PUT /api/lists/${id} для редактирования списка задач.

Роут DELETE /api/lists/${id} для удаления заметки со списком.

####Лицензия

Лицензировано [MIT](License.md) лицензией.
