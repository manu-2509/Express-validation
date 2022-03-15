
const app = require('./index')
const connect = require("./configs/db")

app.listen(3000, async (req, res) => {
    try {
        await connect()
    } catch (err) {
        console.log("something went wrong")

    }
    console.log("listening on port 3000")
})

