import Asynchandler from "../utilitis/Asynchandler.js";
import { User } from "../models/user.model.js";
import ApiRespoance from "../utilitis/ApiRespoance.js"
import ApiError from "../utilitis/ApiError.js";
import { Todo } from "../models/todo.model.js";




const todolist = Asynchandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    const todo = await Todo.find({ createdby: user._id })

    return res
        .status(200)
        .json(
            200,
            new ApiRespoance(200, todo, "all todos")

        )


})


const createtodolist = Asynchandler(async (req, res) => {

    const { title } = await req.body;

    if (title === "") {
        throw new ApiError(400, "title is required");
    }



    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(400, "not logined")
    }
    

    const newTodo = new Todo({
        title,
        createdby: user._id
    });

    await newTodo.save();

    return res
        .status(200)
        .json(new ApiRespoance(
            200,
            newTodo,
            "todo is created"
        ));
});

const upadatetodo = Asynchandler(async (req, res) => {
    const { id, upadatedtitle } = await req.body

    const todo = await Todo.findByIdAndUpdate(id,{title:upadatedtitle})
        
    if (!todo) {
        throw new ApiError(404, "todo is not found")
    }

    const upadatedtodo = await Todo.findById(todo._id)

    if (!upadatedtodo) {
        throw new ApiError(404, "todo is not updated")
    }

    return res.status(200).json(
        new ApiRespoance(200, upadatedtodo, "todo is updated")
    )

})


const deletetodolist = Asynchandler(async (req, res) => {
    const { id } = await req.body

    

    const todo = await Todo.findByIdAndDelete(id)

    if (!todo) {
        throw new ApiError(404, "no todo is found")
    }
    return res.status(200).json(
        new ApiRespoance(200, todo, "todo is delected")

    )

})


export { todolist, createtodolist, deletetodolist, upadatetodo }