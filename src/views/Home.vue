<template>
  <div class="home pa-3">

          <v-text-field
          v-model="newTaskTitle"
          @click:append="AddTask"
          @keyup.enter="AddTask"
          class="pa-3"
            outlined
            label="Add Task"
            append-icon="mdi-plus-circle"
            hide-details
            clearable
            clear-icon="mdi-close-thick"
          ></v-text-field>

<v-divider></v-divider>

    <v-list 
    v-if="tasks.length"
    shaped 
   
   >
      

      <div v-for="task in tasks"
        :key="task.id"
        >
      <v-list-group
        v-model="task.active"
        
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)" 
        :class="{ 'blue lighten-5' : task.active } "
         
         
      >
        <template v-slot:activator  >

        <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"  
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="handleClick(index,task)"

              >

          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

           <v-list-item-action >
              <v-checkbox 
              color="primary"
              large
              :input-value="task.done"
              @change="doneTask(task.id)"
              
              ></v-checkbox>
              
            </v-list-item-action>

          
          <v-list-item-content>
            <v-list-item-title v-text="task.title"
             class= "text-h6 "
             
            :class="{ 'text-decoration-line-through' : task.done }"
            ></v-list-item-title>
          </v-list-item-content>

        <v-list-item-action v-if="task.dueDate">
          <v-list-item-action-text class="pa-1">
            <v-icon Large>mdi-calendar</v-icon>
             {{ task.dueDate | niceDate }}
          </v-list-item-action-text>
        </v-list-item-action>

          <v-progress-circular
        :value="GetProgress(task.id)"
        :size="50"
        :width="7"
        :color="GetProgressColor(GetProgress(task.id))"
      >
      </v-progress-circular>


      
        </template >

<v-divider></v-divider>


        <div
         v-for="child in task.items"
          :key="child.id"
        >
        <v-list-item
        
        >

<v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"  
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="handleSubTaskClick(index,task,child)"

              >

          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          
            <v-list-item-action>
              <v-checkbox :input-value="child.done"
               @click="doneSubTask(task.id,child.id)" 
               ></v-checkbox>

            </v-list-item-action>

          

          <v-list-item-content>
            <v-list-item-title v-text="child.title"
            :class="{ 'text-decoration-line-through' : child.done }"
            ></v-list-item-title>
          </v-list-item-content>

        <v-list-item-action v-if="task.dueDate">
          <v-list-item-action-text class="pa-1">
            <v-icon Large>mdi-calendar</v-icon>
             {{ child.dueDate | niceDate }}
          </v-list-item-action-text>
        </v-list-item-action>

            <v-scroll-x-transition>
              <v-icon
                v-if="child.done"
                color="success"
              >
                mdi-check
              </v-icon>
            </v-scroll-x-transition>

        </v-list-item>

        <v-divider></v-divider>

        </div>
       

      </v-list-group>

         <v-divider></v-divider>

      </div>
    </v-list>

    <div
      v-else
      class="no-tasks"
    >
      <v-icon
        size="150"
        color="primary"
      >
        mdi-checkbox-marked-outline
      </v-icon>
      <div class="text-h4 primary--text text-center">No tasks</div>
    </div>


    <v-dialog
    ref="dialog"
    :value=dialogs.dueDate
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <v-date-picker
      v-model="date"
      scrollable
    >
      <v-spacer></v-spacer>
      <v-btn
        @click="closeTimePicker()"
        text
        color="primary"
      >
        Cancel
      </v-btn>
      <v-btn
        @click="updateTaskDueDate(date)"
        text
        color="primary"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
  </div>


  
</template>




<script>
import { date } from 'quasar'
import Localbase from 'localbase'

let db = new Localbase('db')

export default {


  name: 'Home',
      data: () => ({
        selectedItem: 1,
        newTaskTitle: '',
        date: null,

     dialogs: {
      edit: false,
      dueDate: false,
      delete: false
    },

    CurrentTask:null,
    CurrentSubtask:null,

      items: [
        { title: 'Edit', icon: 'mdi-square-edit-outline' 

        },
        { title: 'Due Date',  icon: 'mdi-calendar-range'

        },
        { title: 'Delete',  icon: 'mdi-delete'

        },
        { title: 'Reorder',  icon: 'mdi-order-alphabetical-ascending'

        },
      ],

      tasks: [
        // {
        //   action: 'mdi-ticket',
        //   done: false,
        //   id:1,
        //   items: [
        //     { title: 'Vacuum Floor',done: false, id:2 },
        //     { title: 'Make Bed', done: false, id:3 },
        //     { title: 'Wash Clothes',done: false, id:4 },
        //     { title: 'Wipe Windows',done: false, id:5 },
        //   ],
        //   title: 'Clean Up Room',
        // },

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
    }),

   filters: {
    niceDate(value) {
      
       return new Date(value).toLocaleDateString('en-US', {timeZone: 'UTC'})
    }
  },


    

    methods: {
      AddTask(){
         
        if(this.newTaskTitle === "")
        return

        let currentTask = this.GetCurrentActiveTask()
        

        if (currentTask){
          let newSubTask = {
          id: Date.now(),
          title: this.newTaskTitle,
          done: false,
          dueDate: this.getRandomDate(29),
        }
        
        let newItems = currentTask.items
        currentTask.items.push(newSubTask)

        db.collection('tasks').doc({ id: currentTask.id }).update({
        items: newItems
        })
        
        

        } else {

          let newTask = {
          action: 'mdi-ticket',
          id: Date.now(),
          title: this.newTaskTitle,
          done: false,
          dueDate: this.getRandomDate(30),
          items: [],
        }
        db.collection('tasks').add(newTask)
        this.tasks.push(newTask)
        }
        this.newTaskTitle = ''
      },

    handleClick(index,task) {
     if(this.items[index].title === "Delete"){
      this.deleteTask(task) 
     } 

     if(this.items[index].title === "Due Date"){

      this.CurrentTask = task
      this.dialogs.dueDate = true
     }
    },


    handleSubTaskClick(index,task,subtask) {
     if(this.items[index].title === "Delete"){
      this.deleteSubTask(task,subtask) 
     } 

     if(this.items[index].title === "Due Date"){

      this.CurrentTask = task
      this.CurrentSubtask = subtask
      this.dialogs.dueDate = true
     }
    },


    getRandomDate(value){
    
      let RandomDays = this.getRandomInt(value)
      const date = new Date();
      date.setDate(date.getDate() + RandomDays);
      
      console.log(date)
      return date
    },

    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },


    updateTaskDueDate(newdate) {
     
      if (this.CurrentSubtask === null){
      this.CurrentTask.dueDate = newdate
        console.log(newdate)
        db.collection('tasks').doc({ id: this.CurrentTask.id}).update({
          dueDate: newdate
        })
      } else {
      
      this.CurrentSubtask.dueDate = newdate
        db.collection('tasks').doc({ id: this.CurrentTask.id}).update({
          items: this.CurrentTask.items
        })
      }
      this.ClearCurrentTasks()
      this.closeTimePicker()

    },


    ClearCurrentTasks(){
      this.CurrentTask = null
      this.CurrentSubtask = null

    },

    closeTimePicker(){
       this.dialogs.dueDate = false;
    },


    deleteTask(Task) { 
     this.tasks = this.tasks.filter(task => task.id !== Task.id)
      db.collection('tasks').doc({ id: Task.id }).delete()
    },

    deleteSubTask(Task,SubTask) { 
    Task.items = Task.items.filter(task => task.id !== SubTask.id)
    

    console.log(Task)
    if (Task.items === null){
    db.collection('tasks').doc({ id: Task.id }).update({
    items: null } )}
   
    else { db.collection('tasks').doc({ id: Task.id }).update({
    items: Task.items
    })
    }
      
    },

      LoadTasks (){
          db.collection('tasks').get().then(tasks => {
          this.tasks = tasks
        })
      },

      getTask(id){
        let task = this.tasks.filter(task => task.id === id)[0]
        return task
      },

      getSubTaskID(id,subID){
        let task = this.tasks.filter(task => task.id === id)[0]
        let subtask = task.items.filter(subtask => subtask.id === subID)[0]
        return subtask
      },

      doneTask(id){
        let task = this.getTask(id)
        db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      })
        task.done = !task.done
        if (!task.items){
          return
        }

        if (task.items.length > 0){
          this.CompleteAllSubTasks(task)

        }
        console.log(task.id)
      },

      doneSubTask(id,subID){
        let subtask = this.getSubTaskID(id,subID)
        subtask.done = !subtask.done
        if(subtask.done === false){
          let task = this.getTask(id)
          if (task.done === true){
            task.done = false;
          }
        }
        
        let currentTask = this.getTask(id)
        db.collection('tasks').doc({ id: currentTask.id }).update({
        items: currentTask.items
        })
      },

      CompleteAllSubTasks(task){
        for (let index = 0; index < task.items.length; index++) {
          const element =  task.items[index];
          element.done = task.done
        }

        db.collection('tasks').doc({ id: task.id }).update({
        items: task.items
        })

      },

      GetActiveView(){
        for (let index = 0; index < this.tasks.length; index++) {
          const element = this.tasks[index];
          if (element.active){
            return true
          }
        }
        return false
      },

      GetCurrentActiveTask(){
        for (let index = 0; index < this.tasks.length; index++) {
          const element = this.tasks[index];
          if (element.active){
            return element
          }
        }
      },

      GetProgress(id){
        let task = this.getTask(id)
        if (!task.items){
          return this.taskProgress(id)
        }

        if (task.items.length > 0){
          return this.subTaskProgress (task)
        } else {
          return this.taskProgress(id)
        }
      },

      GetProgressColor(value){
        return ['error','warning','light-green lighten-1','green lighten-1', 'success'][Math.floor(value / 30)]
      },


      taskProgress (id) {
        let task = this.getTask(id)
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

      created() {
        this.LoadTasks()
      }
    
  }
</script>

<style lang="sass">
  .no-tasks
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    opacity: 0.5
</style>
