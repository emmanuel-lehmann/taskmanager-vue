<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { fetchTasks, addTask, updateTask, deleteTask, assignTaskToUser } from '@/services/taskService';
import { fetchUsers } from '@/services/userService';
import type { Task } from '@/types/Task';
import type { User } from '@/types/User';

const tasks = ref<Task[]>([]);
const users = ref<User[]>([]);
const newTask = ref('');
const editedTask = ref<Task | null>(null);
const selectedTaskForAssign = ref<Task | null>(null);
const selectedUser = ref<User | null>(null);
const isEditDialogOpen = ref(false);
const isAssignDialogOpen = ref(false);
const statusOptions = ['INCOMPLETE', 'COMPLETED'];

const headers = [
  { title: 'Task', key: 'title', sortable: true },
  { title: 'Assign To', key: 'assignedTo', sortable: true },
  { title: 'Status', key: 'status', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false }
];

const loadTasks = async () => {
  try {
    tasks.value = await fetchTasks();
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
  }
};

const loadUsers = async () => {
  try {
    users.value = await fetchUsers();
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};

const createTask = async () => {
  if (!newTask.value.trim()) {
    alert('Task name is required.');
    return;
  }
  try {
    const task = await addTask(newTask.value.trim());
    tasks.value.push(task);
    newTask.value = '';
  } catch (error) {
    console.error('Failed to add task:', error);
  }
};

const openEditDialog = (task: Task) => {
  editedTask.value = { ...task };
  isEditDialogOpen.value = true;
};

const saveTask = async () => {
  if (editedTask.value) {
    try {
      const updatedTask = await updateTask(editedTask.value);
      const index = tasks.value.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) tasks.value[index] = updatedTask;
      closeEditDialog();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  }
};

const removeTask = async (id: number) => {
  try {
    await deleteTask(id);
    tasks.value = tasks.value.filter(task => task.id !== id);
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
};

const openAssignDialog = (task: Task) => {
  selectedTaskForAssign.value = task;
  selectedUser.value = task.assignedTo ?? null;
  isAssignDialogOpen.value = true;
  loadUsers();
};

const assignUserToTask = async () => {
  if (selectedTaskForAssign.value && selectedUser.value) {
    try {
      await assignTaskToUser(selectedTaskForAssign.value.id, selectedUser.value.id);
      selectedTaskForAssign.value.assignedTo = selectedUser.value;
      closeAssignDialog();
    } catch (error) {
      console.error('Failed to assign user:', error);
    }
  }
};

const closeEditDialog = () => {
  isEditDialogOpen.value = false;
  editedTask.value = null;
};

const closeAssignDialog = () => {
  isAssignDialogOpen.value = false;
  selectedTaskForAssign.value = null;
  selectedUser.value = null;
};

onMounted(loadTasks);
</script>

<template>
  <v-container>
    <v-card class="pa-5 elevation-10">
      <v-card-title class="text-h5 text-center">Task List</v-card-title>

      <v-card-text>
        <v-data-table :headers="headers" :items="tasks" class="elevation-2">

          <template v-slot:[`column.title`]="{ column, toggleSort, isSorted, sortDesc }">
            <span @click="toggleSort" style="cursor: pointer;">
              {{ column.title }}
              <v-icon v-if="isSorted" :icon="sortDesc ? 'mdi-arrow-down' : 'mdi-arrow-up'"></v-icon>
              <v-icon v-else>mdi-arrow-up-down</v-icon>
            </span>
          </template>

          <template v-slot:[`column.assignedTo`]="{ column, toggleSort, isSorted, sortDesc }">
            <span @click="toggleSort" style="cursor: pointer;">
              {{ column.title }}
              <v-icon v-if="isSorted" :icon="sortDesc ? 'mdi-arrow-down' : 'mdi-arrow-up'"></v-icon>
              <v-icon v-else>mdi-arrow-up-down</v-icon>
            </span>
          </template>

          <template v-slot:[`item.assignedTo`]="{ item }">
            {{ item.assignedTo?.username || 'Unassigned' }}
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <div class="action-buttons">
              <v-btn color="green" @click="openAssignDialog(item)" size="small" class="shadow-button">Assign</v-btn>
              <v-btn color="blue" @click="openEditDialog(item)" size="small" class="shadow-button">Edit</v-btn>
              <v-btn color="red" @click="removeTask(item.id)" size="small" class="shadow-button">Delete</v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions class="add-task-section">
        <v-text-field v-model="newTask" label="Task Title *" variant="outlined"></v-text-field>
        <v-btn class="add-task-button" color="primary" @click="createTask">Add Task</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="isEditDialogOpen" max-width="500">
      <v-card v-if="editedTask">
        <v-card-title>Edit Task</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedTask.title" label="Task Title *" required variant="outlined"></v-text-field>
          <v-select v-model="editedTask.status" :items="statusOptions" label="Status" variant="outlined"></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveTask">Save</v-btn>
          <v-btn color="grey" @click="closeEditDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isAssignDialogOpen" max-width="500">
      <v-card>
        <v-card-title>Assign User</v-card-title>
        <v-card-text>
          <v-autocomplete
              v-model="selectedUser"
              :items="users"
              item-title="username"
              item-value="id"
              label="Select User"
              return-object
              variant="outlined"
          ></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="assignUserToTask">Assign</v-btn>
          <v-btn color="grey" @click="closeAssignDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
:deep(.v-data-table thead th) {
  font-weight: bold;
  font-size: 1.1rem;
  padding: 10px;
  background-color: #f5f5f5;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.shadow-button {
  background-color: white;
  color: black;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.shadow-button:hover {
  filter: brightness(90%);
}

.add-task-section {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.add-task-button {
  background-color: #f0f0f0;
  color: #000000;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}
</style>
