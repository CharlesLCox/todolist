import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        action: 'mdi-ticket',
        done: false,
        id:1,
        items: [
          { title: 'Vacuum Floor',done: false, id:2 },
          { title: 'Make Bed', done: false, id:3 },
          { title: 'Wash Clothes',done: false, id:4 },
          { title: 'Wipe Windows',done: false, id:5 },
        ],
        title: 'Clean Up Room',
      },

      // {
      //   action: 'mdi-ticket',
      //   done: false,
      //   id:2,
      //   items: [
      //     { title: 'Subtask',done: false },
      //     { title: 'Subtask', done: false },
      //     { title: 'Subtask',done: false },
      //   ],
      //   title: 'Turkey',
      // },
    ],
    
  },
  mutations: {

    AddTask(state, newTaskTitle){
         
      if(newTaskTitle === "")
      return

      let currentTask = GetCurrentActiveTask()
      console.log(currentTask)

      if (currentTask){
        let newSubTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
      }
      currentTask.items.push(newSubTask)

      } else {

        let newTask = {
        action: 'mdi-ticket',
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        items: [],
      }
      tasks.push(newTask)
      }
      newTaskTitle = ''
    },





    doneTask(id){
      let task = getTask(id)
      task.done = !task.done
      if (!task.items){
        return
      }

      if (task.items.length > 0){
        CompleteAllSubTasks(task)

      }
      console.log(task.id)
    },

    CompleteAllSubTasks(task){
      for (let index = 0; index < task.items.length; index++) {
        const element =  task.items[index];
        element.done = task.done
      }
    },

    GetActiveView(){
      for (let index = 0; index < state.tasks.length; index++) {
        const element = state.tasks[index];
        if (element.active){
          return true
        }
      }
      return false
    },

    GetCurrentActiveTask(state){
      for (let index = 0; index < state.tasks.length; index++) {
        const element = state.tasks[index];
        if (element.active){
          return element
        }
      }
    },

    GetProgress(state,id){
      let task = state.tasks.filter(task => task.id === id)[0]
      if (!task.items){
        return taskProgress(id)
      }

      if (task.items.length > 0){
        return subTaskProgress (task)
      } else {
        return taskProgress(id)
      }
    },

    GetProgressColor(id){

      let value = GetProgress(id)

      return ['error','warning','light-green lighten-1','green lighten-1', 'success'][Math.floor(value / 30)]
    },

    doneSubTask(id,subID){
      let subtask = getSubTaskID(id,subID)
      subtask.done = !subtask.done
      if(subtask.done === false){
        let task = getTask(id)
        if (task.done === true){
          task.done = false;
        }
      }
    },

    deleteTask(state,id){
      state.tasks = state.tasks.filter(task => items.id !== id)
    },

    taskProgress (id) {
      let task = getTask(id)
      if(task.done === true){
       return 100 
      } else {
        return 0 
      }
    },

    subTaskProgress (task) {
      let item = task.items
      let completedTasks =  task.items.filter(item => item.done).length
      let CompletetionValue = completedTasks / task.items.length * 100
      if (CompletetionValue === 100){
        task.done = true
      }
      return CompletetionValue

    },

  },
  actions: {
  },
  modules: {
  },

  getters:{

    getTask(id){
      let task = state.tasks.filter(task => task.id === id)[0]
      return task
    },

    getSubTaskID(id,subID){
      let task = state.tasks.filter(task => task.id === id)[0]
      let subtask = task.items.filter(subtask => subtask.id === subID)[0]
      return subtask
    },


  }
})
