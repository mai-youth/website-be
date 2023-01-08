const { initApp } = require('./lib/app')
const { PORT } = require('./lib/constants/env_vairables')

const app = initApp()
const port = PORT || 5000

app.listen(port, () => console.log(`App listening on port ${port}. http://localhost:${port}/`))
