# instractions

1. look at these files and observe the structure of the files
  - prisma/schema.prisma
  - src/renderer/features/projects/schema/ProjectSchema.ts
  - src/renderer/features/projects/schema/NewProjectSchema.ts
  - src/renderer/features/projects/schema/EditProjectSchema.ts
  - src/renderer/features/projects/models/Project.ts
2. notice the points
  - the ProjectSchema file is used to define the structure of the data, and is align with the schema.prisma file
  - NewProjectSchema and EditProjectSchema extends the ProjectSchema
  - the model file is align with the schema.prisma file, using ProjectSchema to describe arguments
3. rewrite files below and ensure the style is consistent with the existing files
  - user
    - src/renderer/features/users/schema/UserSchema.ts
    - src/renderer/features/users/schema/NewUserSchema.ts
    - src/renderer/features/users/schema/EditUserSchema.ts
    - src/renderer/features/users/models/Project.ts
  - task
    - src/renderer/features/tasks/schema/TaskSchema.ts
    - src/renderer/features/tasks/schema/NewTaskSchema.ts
    - src/renderer/features/tasks/schema/EditTaskSchema.ts
    - src/renderer/features/tasks/models/Task.ts
  - log
    - src/renderer/features/logs/schema/LogSchema.ts
    - src/renderer/features/logs/schema/NewLogSchema.ts
    - src/renderer/features/logs/schema/EditLogSchema.ts
    - src/renderer/features/logs/models/Project.ts