<template>
  <div>
    <q-splitter
            v-model="splitterModel"
            style="height: 250px"
    >

      <template v-slot:before>
        <q-tabs
                v-model="tab"
                vertical
                class="text-teal"
        >
          <q-tab name="network" icon="public" label="Network" />
          <div v-if="isPaired">
            <q-tab name="user" icon="account_circle" label="User" />
            <q-tab name="invocations" icon="auto_fix_high" label="Invocations" />
          </div>
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
        >
          <q-tab-panel name="network">
            <div class="text-h4 q-mb-md"></div>
            users online
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h4 q-mb-md">User</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>

          <q-tab-panel name="invocations">
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';

let testLayout = [
  {
    "name":"pioneer",
    "icon":"assets/GreenCompas.jpeg",
    "x":0,
    "y":0,
    "w":2,
    "h":2,
    "i":"0"
  },
];

export default {
  name: 'PageIndex',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data () {
    return {
      isPaired:false,
      splitterModel: 20,
      status:"online",
      layout: testLayout,
      draggable: true,
      resizable: true,
      responsive: true,
      index: 0,
      show: false,
      tab:"",
    }
  },
  mounted: function () {
    this.index = this.layout.length;
    this.$nextTick(function () {
      this.show = true;
    })
  },
  methods: {
  },
}
</script>
