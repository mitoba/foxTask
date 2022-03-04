<template>
  <AddTask v-show="showAddTask" @add-task="addTask" />
  <Tasks
    @toggle-reminder="toggleReminder"
    @delete-task="deleteTask"
    :tasks="tasks"
  />
</template>

<script>
import axios from "axios";
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";

export default {
  name: "Home",
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async addTask(task) {
      const response = await axios.post("http://localhost:5000/tasks", task);
      const data = await response.data;
      this.tasks = [...this.tasks, data];
    },
    async deleteTask(id) {
      if (confirm("Are you sure?")) {
        const response = await axios.delete(
          `http://localhost:5000/tasks/${id}`
        );
        console.log(response);
        response.status === 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert("Error deleting task");
      }
    },
    async toggleReminder(id) {
      const taskToToggle = await this.changeReminder(id);
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

      const response = await axios.put(
        `http://localhost:5000/tasks/${id}`,
        updTask
      );
      const data = await response.data;

      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      );
    },
    async getTasks() {
      const response = await axios.get("http://localhost:5000/tasks");
      return response.data;
    },
    async changeReminder(id) {
      const response = await axios.get(`http://localhost:5000/tasks/${id}`);
      return response.data;
    },
  },
  async created() {
    this.tasks = await this.getTasks();
  },
};
</script>