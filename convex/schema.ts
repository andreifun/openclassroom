import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        name: v.string(),
        pfp: v.string(),
        bio: v.string(),
        followers: v.array(v.string()),
        tags: v.array(v.string()),
    }),
    classrooms: defineTable({
        name: v.string(),
        description: v.string(),
        subjects: v.array(v.id("subjects")),
        students: v.array(v.id("users")),
        teachers: v.array(v.id("users")),
    }),
    subjects: defineTable({
        name: v.string(),
        color: v.string(),
    }),
    assignments: defineTable({
        type: v.string(),
        fromString: v.string(),
        pageString: v.string(),
        exercisesString: v.string(),
        notesString: v.string(),
        createdAt: v.string(),
        dueDate: v.string(),
        subject: v.id("subjects"),
        postedBy: v.string(),
        school: v.id("schools"),
    })
});