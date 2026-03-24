import app from "./app.js"
import { ENV } from "./utils/env.js"

const start = async () => {
  try {
    await app.listen({ port: ENV.PORT })

    process.on("SIGINT", async () => {
      await app.close()
      process.exit(0)
    })

    process.on("SIGTERM", async () => {
      await app.close()
      process.exit(0)
    })

  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()