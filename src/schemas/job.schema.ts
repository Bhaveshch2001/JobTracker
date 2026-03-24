export const jobSchema = {
  $id: "Job",
  type: "object",
  properties: {
    id: { type: "number" },
    title: { type: "string" },
    status: {
      type: "string",
      enum: ["TODO", "IN_PROGRESS", "DONE"]
    },
    dueDate: { type: ["string", "null"], format: "date-time" },
    assigneeId: { type: "number" }
  }
}

// CREATE
export const createJobSchema = {
  body: {
    type: "object",
    required: ["title", "status"],
    properties: {
      title: { type: "string" },
      status: {
        type: "string",
        enum: ["TODO", "IN_PROGRESS", "DONE"]
      },
      dueDate: { type: "string", format: "date-time" }
    }
  },
  response: {
    201: { $ref: "Job#" }
  }
}

//  GET ALL
export const getJobsSchema = {
  querystring: {
    type: "object",
    properties: {
      page: { type: "number", default: 1 },
      limit: { type: "number", default: 20 }
    }
  },
  response: {
    200: {
      type: "array",
      items: { $ref: "Job#" }
    }
  }
}

//  GET BY ID
export const getJobByIdSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" }
    }
  },
  response: {
    200: { $ref: "Job#" },
    404: {
      type: "object",
      properties: {
        error: { type: "string" }
      }
    }
  }
}

//  UPDATE
export const updateJobSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" }
    }
  },
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      status: {
        type: "string",
        enum: ["TODO", "IN_PROGRESS", "DONE"]
      },
      dueDate: { type: "string", format: "date-time" }
    }
  },
  response: {
    200: { $ref: "Job#" },
    404: {
      type: "object",
      properties: {
        error: { type: "string" }
      }
    },
    500: {
      type: "object",
      properties: {
        error: { type: "string" }
      }
    }
  },
  
}

// DELETE
export const deleteJobSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" }
    }
  },
  response: {
    204: {
      type: "object",
      properties: {
        message: { type: "string" }
      }
    },
    404: {
      type: "object",
      properties: {
        error: { type: "string" }
      }
    },
    500: {
      type: "object",
      properties: {
        error: { type: "string" }
      }
    }
  }
}