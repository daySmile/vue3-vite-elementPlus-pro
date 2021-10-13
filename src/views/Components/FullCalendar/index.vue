<template>
  <div class="CalendarInfo">
    <div class='info'>
      <el-divider content-position='left'>日历组件</el-divider>
      <span style='text-align: left'>Vue3版本的
        <a href="https://fullcalendar.io/docs/vue">FullCalendar</a>
      </span>
    </div>
    <el-row>
      <el-col :offset='1' :span='22'>
        <div class='grid-content bg-purple-dark'>
          <el-card class='box-card'>
            <template #header>
              <div class='card-header'>
                <span>日历组件</span>
              </div>
            </template>
            <FullCalendar class="demo-app-calendar" :options="calendarOptions">
              <template #eventContent="arg">
                <b>{{ arg.timeText }}</b>
                <i>{{ arg.event.title }}</i>
              </template>
            </FullCalendar>

          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import '@fullcalendar/core/vdom' // solve problem with Vite
import FullCalendar, {CalendarOptions, EventApi, DateSelectArg, EventClickArg} from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {ElMessageBox, ElMessage} from 'element-plus'
import {INITIAL_EVENTS, createEventId} from './event-utils'

export default defineComponent({
  name: 'Calendar',
  components: {
    FullCalendar
  },
  setup() {
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS, // 可选项，可以从远程接口返回初始化数据
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents
        /* 可以通过触发以下事件来更新远程数据库
        eventAdd:
        eventChange:
        eventRemove:
        */
      } as CalendarOptions,
      currentEvents: [] as EventApi[]
    }
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    /**
     * @description 选中某天处理事件
     */
    handleDateSelect(selectInfo: DateSelectArg) {
      // eslint-disable-next-line no-alert
      const title = prompt('请输入任务标题')
      const calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    },
    /**
     * @description 选中当前任务事件
     */
    handleEventClick(clickInfo: EventClickArg) {
      ElMessageBox.confirm('确定删除当前任务吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            clickInfo.event.remove()

            ElMessage({
              type: 'success',
              message: '删除成功'
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消删除'
            })
          })
    },
    /**
     * @description 选中当前事件
     */
    handleEvents(events: EventApi[]) {
      this.currentEvents = events
    }
  }
})
</script>
<style lang="scss" scoped>
.CalendarInfo {
  margin-top: 20px;

  .demo-ruleForm {
    text-align: left;
  }

  .info {
    text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 100%;
  }
}

</style>
