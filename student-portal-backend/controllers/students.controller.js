import { Student } from "../models/student.model.js";
import path from "path";
import fs from "fs/promises";

// Create New Student
export const addStudent = async (req, res) => {
    try {
        const { stdId, stdName, email, phone } = req.body;

        if (!stdId || !stdName || !email || !phone) {
            return res.status(400).json({ error: "Please provide all fields" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "Profile image is required" });
        }

        const savedImage = `/uploads/${req.file.filename}`;

        const newStudent = await Student.create({
            stdId,
            stdName,
            email,
            phone,
            profileImage: savedImage
        });

        return res.status(201).json(newStudent);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message || "Server error" });
    }
};

// Fetch All Students
export const getAllStudents = async (req, res) => {
    try {
        const result = await Student.find().sort({ createdAt: -1 });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch Single Student Using ID
export const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Student ID missing" });
        }

        const student = await Student.findOne({ stdId: id });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Update Student Details
export const updateStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        const newFile = req.file;

        const existing = await Student.findOne({ stdId: id });

        if (!existing) {
            return res.status(404).json({ error: "Student not found" });
        }

        const updateData = {};

        if (updatedFields.stdId) updateData.stdId = updatedFields.stdId;
        if (updatedFields.stdName) updateData.stdName = updatedFields.stdName;
        if (updatedFields.email) updateData.email = updatedFields.email;
        if (updatedFields.phone) updateData.phone = updatedFields.phone;

        if (newFile) {
            if (existing.profileImage) {
                const oldRelative = existing.profileImage.replace(/^\//, "");
                const fileToRemove = path.join(process.cwd(), oldRelative);

                try {
                    await fs.unlink(fileToRemove);
                } catch (err) {
                    console.warn("Unable to remove old image:", err.message);
                }
            }

            updateData.profileImage = `/uploads/${newFile.filename}`;
        }

        const response = await Student.updateOne({ stdId: id }, { $set: updateData });
        res.status(200).json(response);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove Student
export const deleteStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        const record = await Student.findOne({ stdId: id });
        if (!record) {
            return res.status(404).json({ error: "Student not found" });
        }

        if (record.profileImage) {
            const oldRelativePath = record.profileImage.replace(/^\//, "");
            const oldFile = path.join(process.cwd(), oldRelativePath);

            try {
                await fs.unlink(oldFile);
            } catch (err) {
                console.warn("Could not delete image:", err.message);
            }
        }

        const deletion = await Student.deleteOne({ stdId: id });
        res.status(200).json({ deletion });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
