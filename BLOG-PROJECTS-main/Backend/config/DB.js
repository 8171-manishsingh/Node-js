import mongoose from "mongoose"
import "dotenv/config"

const connect = mongoose.connect(process.env.DB_URL)
export default connect
