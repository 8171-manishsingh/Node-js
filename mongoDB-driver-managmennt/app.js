import express from "express";
import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} from "./db.js";

export const app = express();
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send(`
        <h1>Employee Management API</h1>
        <p>Endpoints:</p>
        <ul>
            <li>GET /api/employees → All employees</li>
            <li>GET /api/employees?role=Developer → Filter by role</li>
            <li>GET /api/employees?name=John → Search by name</li>
            <li>GET /api/employees/E001 → Get by ID</li>
            <li>POST /api/employees → Create</li>
            <li>PATCH /api/employees/E001 → Update</li>
            <li>DELETE /api/employees/E001 → Delete</li>
        </ul>
    `);
});

// GET ALL + FILTERS
app.get("/api/employees", async (req, res) => {
    try {
        const { role, name, emp_id } = req.query;
        const employees = await getAllEmployees({ role, name, emp_id });
        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET BY ID
app.get("/api/employees/:id", async (req, res) => {
    try {
        const employee = await getEmployeeById(req.params.id);
        if (!employee) return res.status(404).json({ success: false, error: "Employee not found" });
        res.status(200).json({ success: true, data: employee });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// CREATE
app.post("/api/employees", async (req, res) => {
    try {
        // Validation: Only allow these 6 fields
        const allowedFields = ["emp_id", "name", "email", "role", "department", "salary"];
        const receivedFields = Object.keys(req.body);

        const invalidField = receivedFields.find(field => !allowedFields.includes(field));
        if (invalidField) return res.status(400).json({ error: `Field '${invalidField}' not allowed` });

        if (receivedFields.length > 6) return res.status(400).json({ error: "Maximum 6 fields allowed" });

        const required = ["emp_id", "name", "email", "role"];
        for (let field of required) {
            if (!req.body[field]) return res.status(400).json({ error: `${field} is required` });
        }

        const newEmployee = await createEmployee(req.body);
        res.status(201).json({ success: true, data: newEmployee });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// UPDATE
app.patch("/api/employees/:id", async (req, res) => {
    try {
        await updateEmployee(req.params.id, req.body);
        res.status(200).json({ success: true, message: "Employee updated" });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// DELETE
app.delete("/api/employees/:id", async (req, res) => {
    try {
        await deleteEmployee(req.params.id);
        res.status(200).json({ success: true, message: "Employee deleted" });
    } catch (err) {
        res.status(404).json({ success: false, error: err.message });
    }
});