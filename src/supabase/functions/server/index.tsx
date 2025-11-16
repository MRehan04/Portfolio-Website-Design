import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-0fc12757/health", (c) => {
  return c.json({ status: "ok" });
});

// Project type definition
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

// GET all projects
app.get("/make-server-0fc12757/projects", async (c) => {
  try {
    const projectKeys = await kv.getByPrefix("project:");
    const projects = projectKeys.map(item => item.value as Project);
    
    // Sort by createdAt descending (newest first)
    projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return c.json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return c.json({ success: false, error: "Failed to fetch projects" }, 500);
  }
});

// GET project by ID
app.get("/make-server-0fc12757/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const project = await kv.get(`project:${id}`);
    
    if (!project) {
      return c.json({ success: false, error: "Project not found" }, 404);
    }
    
    return c.json({ success: true, data: project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return c.json({ success: false, error: "Failed to fetch project" }, 500);
  }
});

// POST new project
app.post("/make-server-0fc12757/projects", async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.image || !body.technologies) {
      return c.json({ 
        success: false, 
        error: "Missing required fields: title, description, image, technologies" 
      }, 400);
    }
    
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    
    const newProject: Project = {
      id,
      title: body.title,
      description: body.description,
      image: body.image,
      technologies: body.technologies,
      liveUrl: body.liveUrl,
      githubUrl: body.githubUrl,
      featured: body.featured || false,
      createdAt: now,
      updatedAt: now,
    };
    
    await kv.set(`project:${id}`, newProject);
    
    return c.json({ success: true, data: newProject }, 201);
  } catch (error) {
    console.error("Error creating project:", error);
    return c.json({ success: false, error: "Failed to create project" }, 500);
  }
});

// PUT update project
app.put("/make-server-0fc12757/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const existingProject = await kv.get(`project:${id}`) as Project | null;
    
    if (!existingProject) {
      return c.json({ success: false, error: "Project not found" }, 404);
    }
    
    const updatedProject: Project = {
      ...existingProject,
      ...body,
      id, // Ensure ID doesn't change
      createdAt: existingProject.createdAt, // Preserve creation date
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`project:${id}`, updatedProject);
    
    return c.json({ success: true, data: updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    return c.json({ success: false, error: "Failed to update project" }, 500);
  }
});

// DELETE project
app.delete("/make-server-0fc12757/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    
    const existingProject = await kv.get(`project:${id}`);
    
    if (!existingProject) {
      return c.json({ success: false, error: "Project not found" }, 404);
    }
    
    await kv.del(`project:${id}`);
    
    return c.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return c.json({ success: false, error: "Failed to delete project" }, 500);
  }
});

// GET featured projects
app.get("/make-server-0fc12757/projects/featured/list", async (c) => {
  try {
    const projectKeys = await kv.getByPrefix("project:");
    const projects = projectKeys.map(item => item.value as Project);
    const featuredProjects = projects.filter(project => project.featured);
    
    // Sort by createdAt descending (newest first)
    featuredProjects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return c.json({ success: true, data: featuredProjects });
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return c.json({ success: false, error: "Failed to fetch featured projects" }, 500);
  }
});

Deno.serve(app.fetch);