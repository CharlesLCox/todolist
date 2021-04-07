<template>
  <v-stepper
    v-model="e6"
    vertical
  >
    <v-stepper-step
      :complete="e6 > 1"
      step="1"
    >
      Add Task a Task and press Enter/Confirm
      <small>Tap or click the input field to get started</small>
    </v-stepper-step>

    <v-stepper-content step="1">
<v-container fill-height>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8">

        <v-card
          class="mb-12"
          color="white"
         height="150%"
          width="500px"
          align="center"
          justify="center"
        >
      <v-img
          class="mb-12 height:100% width:auto"

      src="step1.gif"
    ></v-img>
        
        </v-card>

        </v-col>
    </v-row>
</v-container>
      <v-btn
        color="primary"
        @click="e6 = 2"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
    >
      To add A Subtask, Select The Task That The Subtask Will Be Under
      <small>Tap And highlight The task You Want To add</small> 
    </v-stepper-step>

    <v-stepper-content step="2">
<v-container fill-height>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8">

        <v-card
          class="mb-12"
          color="white"
         height="150%"
          width="500px"
          align="center"
          justify="center"
        >
      <v-img
          class="mb-12 height:100% width:auto"

      src="step2.gif"
    ></v-img>
        
        </v-card>

        </v-col>
    </v-row>
</v-container>
      <v-btn
        color="primary"
        @click="e6 = 3"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 3"
      step="3"
    >
      Once Selected, Type In The Name Of The Subtask and Press Enter/Confirm
      <small>Make Sure the Task is Selected</small> 
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-container fill-height>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8">

        <v-card
          class="mb-12"
          color="white"
         height="150%"
          width="500px"
          align="center"
          justify="center"
        >
      <v-img
          class="mb-12 height:100% width:auto"

      src="step3.gif"
    ></v-img>
        
        </v-card>

        </v-col>
    </v-row>
</v-container>
      <v-btn
        color="primary"
        @click="e6 = 4"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">
    Once You Complete The Task, Press The Toggle To The Left To Finish It 
    <small>Subtask Will Need To Be Completed To Finish The Main Task</small> 
    </v-stepper-step>
    <v-stepper-content step="4">
<v-container fill-height>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8">

        <v-card
          class="mb-12"
          color="white"
            height="150%"
          width="500px"
          align="center"
          justify="center"
        >
      <v-img
          class="mb-12 height:100% width:auto"

      src="step4.gif"
    ></v-img>
        
        </v-card>

        </v-col>
    </v-row>
</v-container>
      <v-btn
        color="primary"
        @click="e6 = 1"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>



<script>
  export default {
    data () {
      return {
        e6: 1,
      }
    },
  }
</script>
