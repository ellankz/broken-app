!! В проект добавлен dotenv. Чтобы приложение работало, нужно после скачивания репозитория переименовать example.env в .env

!!! Номера измененнных строк отвечают изначальному состоянию приложения. Номера добавленных строк - итоговому состоянию.

### Найденные ошибки компиляции

1. Ошибка в импорте Game. Заменила на `const Game = require('../models/game')(require('../db'));`. Исправлена строка 2 в файле controllers/gamecontroller.js

2. Ошибка в импорте `express` и создании инстанса `router`. Для инициализации сперва нужно было импортировать `express`. Исправлена строка 1 в файле controllers/usercontroller.js

3. Ошибка в названии пакета bcryptjs. Исправила `bcrypt` на `bcryptjs`. Исправлена строка 2 в файле controllers/usercontroller.js

4. Ошибка в импорте `User`. Заменила на `const User = require('../models/user')(require('../db'));`. Исправлена строка 5 в файле controllers/usercontroller.js

5. Отсутсвие экспорта из файла db.js. Добавила экспорт `{ sequelize, DataTypes: Sequelize }`. Модели принимают один обьект вместо списка агрументов (`sequelize, DataTypes` => `{ sequelize, DataTypes }`). Добавлена строка 27 в файле db.js.

6. Ошибка в импорте `User`. Заменила на `const User = require('../models/user')(require('../db'));`. Исправлена строка 2 в файле middleware/validate-session.js. Исправлена строка 1 в файлах models/game.js и models/user.js

7. Отсутствие экспорта из models/game.js. Добавила экспорт. Исправлена строка 1 в файле models/game.js

8. Неправильно указано название экспортируемой переменной в controllers/gamecontroller.js. Исправила `routers` на `router`. Исправлена строка 116 в файле controllers/gamecontroller.js

### Найденные ошибки логики приложения

1. Обработка корневого роута ("/") отсутсвтует. Добавлена обрабтка корневого роута. Добавлены строки 13-19 в app.js

2. Нет обработки несуществующих роутов. Добавлена их обработка. Добавлена строки 27-32 в app.js

3. Исправила `passwordhash` на `passwordHash` в строке 11 в controllers/usercontroller.js

4. Исправила `req.user` на `req.user.id` в строке 73 файла ontrollers/gamecontroller.js

5. неправильное имя параметра `data` заменила на `game` в controllers/gamecontroller.js строка 7

6. Операция изменения game не возвращает ошибку при неуспешном изменнении. Для обработки этого кейса, добавила условие `gameUpdated[0] === 0`, где `gameUpdated` - ответ из бд. Добавлены строки 75-77 в controllers/gamecontroller.js

7. Операция удаления game не возаращает ошибку при неуспешном удалении. Для обработки этого кейса, добавила условие `game === 0`, где `game` - ответ из бд. Добавлены строки 98-100 в controllers/gamecontroller.js

### Рефактор кода

1. Заменила `body-parser` на `express.json`

2. Добавила dotenv

3. Вынесла константы в отдельный файл

4. Избавилась от `var`, заменила на `const`

5. Заменила `.then` синтаксис на `try..catch` + `async await`

6. Code style: удалила `console.log(sessionToken)`, добавила недостающие `;` и `,`, установила отступы в два пробела.
