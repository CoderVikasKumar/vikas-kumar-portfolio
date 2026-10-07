import Contact from "../models/Contact.js";
import { sendContactEmail } from "../utils/sendEmail.js";

// ==========================================
// CREATE CONTACT - PUBLIC
// ==========================================
export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, subject and message are required.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    if (cleanName.length < 2 || cleanName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 100 characters.",
      });
    }

    if (cleanSubject.length < 3 || cleanSubject.length > 200) {
      return res.status(400).json({
        success: false,
        message: "Subject must be between 3 and 200 characters.",
      });
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message must be between 10 and 2000 characters.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const existingContact = await Contact.findOne({
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      createdAt: {
        $gte: new Date(Date.now() - 10 * 60 * 1000),
      },
    });

    if (existingContact) {
      return res.status(409).json({
        success: false,
        message: "This message was already submitted recently.",
      });
    }

    const contact = await Contact.create({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });

    try {
      await sendContactEmail({
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage,
      });
    } catch (emailError) {
      console.error("Email Notification Error:", emailError);

      return res.status(201).json({
        success: true,
        message:
          "Your message was saved successfully, but email notification could not be sent.",
        data: {
          id: contact._id,
          status: contact.status,
          createdAt: contact.createdAt,
        },
      });
    }

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully.",
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        status: contact.status,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error("Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

// ==========================================
// GET ALL CONTACTS - ADMIN ONLY
// ==========================================
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Get Contacts Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch contact messages.",
    });
  }
};

// ==========================================
// GET SINGLE CONTACT - ADMIN ONLY
// ==========================================
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).select("-__v");

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Get Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch contact message.",
    });
  }
};

// ==========================================
// UPDATE CONTACT STATUS - ADMIN ONLY
// ==========================================
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["new", "read", "replied"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-__v");

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact status updated successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("Update Contact Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update contact status.",
    });
  }
};

// ==========================================
// DELETE CONTACT - ADMIN ONLY
// ==========================================
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete contact message.",
    });
  }
};