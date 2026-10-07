import express from "express";

import {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// PUBLIC ROUTE
// ==========================================

// Visitor contact form
router.post("/", createContact);


// ==========================================
// ADMIN PROTECTED ROUTES
// ==========================================

// Get all contact messages
router.get("/", protect, getContacts);

// Get single contact message
router.get("/:id", protect, getContactById);

// Update contact status
router.patch("/:id/status", protect, updateContactStatus);

// Delete contact message
router.delete("/:id", protect, deleteContact);

export default router;