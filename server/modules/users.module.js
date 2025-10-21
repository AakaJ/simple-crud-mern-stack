import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please input a name"],
        },
        age: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: [true, "Please input an email"],
        },
        hobby: {
            type: String,
            required: false,
            default: "No hobby",
        }
    },
    {
        timestamps: true,
    }
)

const Users = mongoose.model("User", userSchema);

export default Users;