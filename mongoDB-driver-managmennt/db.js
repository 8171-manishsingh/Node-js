import { MongoClient } from "mongodb";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);
let collection;

// Connect to DB (singleton pattern)
const connectDB = async () => {
    if (collection) return collection;
    try {
        await client.connect();
        console.log("MongoDB Connected Successfully");
        const db = client.db("employeesDB");
        collection = db.collection("employees");
        return collection;
    } catch (err) {
        console.error("DB Connection Failed:", err.message);
        process.exit(1);
    }
};

// CREATE
export const createEmployee = async (employeeData) => {
    const col = await connectDB();
    const exists = await col.findOne({
        $or: [{ emp_id: employeeData.emp_id }, { email: employeeData.email }]
    });
    if (exists) throw new Error("Employee with this emp_id or email already exists");

    const result = await col.insertOne({
        ...employeeData,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    return { insertedId: result.insertedId, ...employeeData };
};

// READ ALL + FILTERS
export const getAllEmployees = async (filters = {}) => {
    const col = await connectDB();
    let query = {};

    if (filters.role) query.role = filters.role;
    if (filters.name) query.name = { $regex: filters.name, $options: "i" };
    if (filters.emp_id) query.emp_id = filters.emp_id;

    return await col.find(query).sort({ createdAt: -1 }).toArray();
};

// READ ONE BY emp_id
export const getEmployeeById = async (emp_id) => {
    const col = await connectDB();
    return await col.findOne({ emp_id });
};

// UPDATE BY emp_id
export const updateEmployee = async (emp_id, updateData) => {
    const col = await connectDB();

    // Prevent changing emp_id or email to existing ones
    if (updateData.email || updateData.emp_id) {
        const checkQuery = {
            $or: []
        };
        if (updateData.email) checkQuery.$or.push({ email: updateData.email });
        if (updateData.emp_id) checkQuery.$or.push({ emp_id: updateData.emp_id });
        if (checkQuery.$or.length > 0) {
            checkQuery.$or.push({ emp_id }); // exclude current
            const exists = await col.findOne({
                ...checkQuery,
                emp_id: { $ne: emp_id }
            });
            if (exists) throw new Error("Email or Employee ID already taken");
        }
    }

    const result = await col.updateOne(
        { emp_id },
        { $set: { ...updateData, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) throw new Error("Employee not found");
    return { message: "Employee updated successfully" };
};

// DELETE BY emp_id
export const deleteEmployee = async (emp_id) => {
    const col = await connectDB();
    const result = await col.deleteOne({ emp_id });
    if (result.deletedCount === 0) throw new Error("Employee not found");
    return { message: "Employee deleted successfully" };
};