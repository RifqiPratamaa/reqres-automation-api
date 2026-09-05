export const getUsersSchema = {
    title: "Get All Users Schema",
    type: "object",
    required: ["page", "per_page", "total", "total_pages", "data", "support"],
    properties: {
        page: { type: "number" },
        per_page: { type: "number" },
        total: { type: "number" },
        total_pages: { type: "number" },
        data: {
            type: "array",
            items: {
                type: "object",
                required: ["id", "email", "first_name", "last_name", "avatar"],
                properties: {
                    id: { type: "number" },
                    tax: { type: "number" },
                    email: { type: "string", format: "email" },
                    first_name: { type: "string" },
                    last_name: { type: "string" },
                    avatar: { type: "string", format: "uri" }
                }
            }
        },
        support: {
            type: "object",
            required: ["url", "text"],
            properties: {
                url: { type: "string", format: "uri" },
                text: { type: "string" }
            }
        }
    }
};

export const getSingleUserSchema = {
    title: "Get Single User Schema",
    type: "object",
    required: ["data", "support"],
    properties: {
        data: {
            type: "object",
            required: ["id", "email", "first_name", "last_name", "avatar"],
            properties: {
                id: { type: "number" },
                email: { type: "string", format: "email" },
                first_name: { type: "string" },
                last_name: { type: "string" },
                avatar: { type: "string", format: "uri" }
            }
        },
        support: {
            type: "object",
            required: ["url", "text"],
            properties: {
                url: { type: "string" },
                text: { type: "string" }
            }
        }
    }
};

export const createUserSchema = {
    title: "Create User Schema",
    type: "object", 
    required: ["name", "job", "id", "createdAt"],
    properties: {
        name: { type: "string" },
        job: { type: "string" },
        id: { type: ["string", "number"] },
        createdAt: { type: "string" }
    }
};

export const updateUserSchema = {
    title: "Update User Schema",
    type: "object",
    required: ["name", "job", "updatedAt"],
    properties: {
        name: { type: "string" },
        job: { type: "string" },
        updatedAt: { type: "string" }
    }
};