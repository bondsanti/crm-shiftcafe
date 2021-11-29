<template>
  <v-card width="100%">
    <v-card-title class="ma-0 pa-0">
      <v-col align="center" cols="12" md="4" class="mb-0">
        <v-row justify="center">
          <h1 class="font-weight-regular">
            <v-icon size="60">{{ icon }}</v-icon> {{ title }}
          </h1>
        </v-row>
        <v-row v-show="showDateInput" justify="center">
          {{ dateRangeText }}
        </v-row>
        <v-row v-show="showSelectInput" justify="center">
          {{ textSelect }}
        </v-row>
      </v-col>
      <v-col cols="12" md="8">
        <!-- first-row -->
        <v-row class="pa-2 mb-0">
          <v-col cols="12" :md="target ? 5 : 6" class="ma-0 pt-1 pa-0">
            <!-- date time -->
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-show="showDateInput"
                  v-model="dateRangeText"
                  filled
                  hide-details
                  rounded
                  label="วันที่"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" range no-title locale="th">
                <v-btn
                  color="primary"
                  @click="$refs.menu.save(date), getDateRange()"
                >
                  ตกลง
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  ยกเลิก
                </v-btn>
              </v-date-picker>
            </v-menu>
            <!-- select -->
            <v-select
              v-show="showSelectInput"
              v-model="select"
              :items="itemsForSelect"
              filled
              rounded
              label="หมวดหมู่"
              dense
              hide-details
              @change="sendValueSelectToParent"
            ></v-select>
          </v-col>
          <v-col
            :cols="target ? 6 : 12"
            :md="target ? 5 : 6"
            class="ma-0 px-1 pt-1 pa-0"
          >
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="ค้นหา"
              filled
              rounded
              hide-details
            ></v-text-field>
          </v-col>
          <v-col
            v-show="target"
            cols="6"
            md="2"
            class="ma-0 pt-1 pa-0"
            align-self="center"
          >
            <v-btn
              v-if="excelFirstCol"
              rounded
              block
              color="success"
              @click="onExport"
              ><v-icon left>mdi-file-table</v-icon>EXEL</v-btn
            >
            <v-text-field
              v-else
              v-model="goal"
              append-icon="mdi-target"
              label="เป้าหมายต่อวัน"
              filled
              rounded
              hide-details
              @keypress.enter="getDateRange"
              @keypress="getDateRangeForKeyPress"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- second-row -->
        <v-row v-show="secondRow" justify="center" align="center" class="mt-0">
          <v-chip
            v-for="(item, i) in itemsSubHeader"
            v-show="chip"
            :key="i"
            class="ma-2"
            :color="item.color"
            text-color="white"
          >
            <v-icon left> {{ item.icon }} </v-icon>
            {{ item.value | currency }} {{ item.text }}
          </v-chip>
          <v-btn
            v-for="item in itemsSubHeader"
            v-show="btn"
            :key="item.text"
            rounded
            :color="btnSelect == item.text ? 'primary' : 'warning'"
            class="ma-1"
            @click="$emit('filterReceipt', item.text)"
            ><v-icon left>{{ item.icon }}</v-icon> {{ item.value }}
            {{ item.text }}</v-btn
          >
          <v-btn
            v-show="!excelFirstCol"
            rounded
            color="success"
            @click="onExport"
            ><v-icon left>mdi-file-table</v-icon>EXEL</v-btn
          >
        </v-row>
        <!-- third-row -->
        <v-row v-show="thirdRow" justify="end" align="center" class="mt-0 mr-1">
          <v-btn
            :disabled="disableAddButton"
            rounded
            color="primary"
            class="mr-1"
            @click="$emit('addData')"
            ><v-icon left>mdi-database-plus</v-icon>เพิ่มข้อมูล{{
              title
            }}</v-btn
          >
          <v-btn rounded color="success" @click="onExport"
            ><v-icon left>mdi-file-table</v-icon>EXEL</v-btn
          >
        </v-row>
      </v-col>
    </v-card-title>
    <v-data-table
      v-if="!groupBy"
      :headers="headers"
      :search="search"
      :items="items"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      loader-height="10"
      :loading="loading"
      loading-text="กำลังค้นหาข้อมูล..."
      hide-default-footer
      class="elevation-1 ma-2"
      @page-count="pageCount = $event"
      @click:row="handleClick"
    >
      <template #no-data>
        <v-alert
          text
          prominent
          class="pa-6 mx-6 my-6"
          type="warning"
          icon="mdi-cloud-alert"
        >
          ไม่มีข้อมูล
        </v-alert>
      </template>
      <!-- income-expense -->
      <template #[`item.date`]="{ item }">
        {{ item.date | dateTh }}
      </template>
      <template #[`item.dateTime`]="{ item }">
        {{ item.dateTime | dateThWithTime }}
      </template>
      <template #[`item.income`]="{ item }">
        {{ item.income | comma(2) }}
      </template>
      <template #[`item.expense`]="{ item }">
        {{ item.expense | comma(2) }}
      </template>
      <template #[`item.balance`]="{ item }">
        <span :class="`${item.balance > 0 ? 'green' : 'red'}--text`">
          {{ item.balance | comma(2) }}
        </span>
      </template>
      <!-- report-index -->
      <template #[`item.diffPerGoal`]="{ item }">
        <span :class="`${item.diffPerGoal > 0 ? 'green' : 'red'}--text`">{{
          item.diffPerGoal > 0 ? '+ ' : ''
        }}</span
        ><span :class="textColor(item.diffPerGoal)">{{
          item.diffPerGoal | comma(2)
        }}</span>
      </template>
      <template #[`item.diffPerYesterday`]="{ item }">
        <span :class="`${item.diffPerYesterday > 0 ? 'green' : 'red'}--text`">{{
          item.diffPerYesterday > 0 ? '+' : ''
        }}</span
        ><span :class="textColor(item.diffPerYesterday)">{{
          item.diffPerYesterday | comma(2)
        }}</span>
      </template>
      <!-- report-index -->
      <template #[`item.type`]="{ item }">
        <span :class="textReceiptColor(item.type)">{{ item.type }}</span>
      </template>
      <!-- report-receipt -->
      <template #[`item.detail`]="{ item }">
        <v-row>{{ item.detail }}</v-row>
        <v-row>{{ item.phone }}{{ item.adviseName }}</v-row>
      </template>
      <template #[`item.status`]="{ item }">
        <v-chip class="ma-2" :color="item.status ? 'success' : 'red'" outlined>
          <v-icon left>
            {{ item.status ? 'mdi-account-check' : 'mdi-account-remove' }}
          </v-icon>
          {{ item.status ? 'ENABLE' : 'DISABLE' }}
        </v-chip>
      </template>
      <template #[`item.count`]="{ item }">
        <v-btn
          :disabled="item.disableViewCustomer"
          rounded
          outlined
          @click="$emit('viewCustomer', item.advise_code)"
          ><v-icon left>mdi-eye</v-icon>{{ item.count }} คน</v-btn
        >
      </template>
      <template #[`item.sale`]="{ item }">
        {{ item.sale | comma }}
      </template>
      <template #[`item.totalSpent`]="{ item }">
        {{ item.totalSpent | comma(2) }}
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn
          :disabled="item.disableEdit"
          fab
          icon
          color="warning"
          @click="$emit('formActions', { type: 'edit', data: item })"
          ><v-icon>mdi-grease-pencil</v-icon></v-btn
        >
        <v-btn
          :disabled="item.disableDelete"
          fab
          icon
          color="red"
          @click="$emit('formActions', { type: 'delete', data: item })"
          ><v-icon>mdi-trash-can</v-icon></v-btn
        >
      </template>
      <template #footer>
        <div class="text-center pb-1 mx-5">
          <v-pagination
            v-model="page"
            :length="pageCount"
            total-visible="20"
            circle
          ></v-pagination>
        </div>
      </template>
    </v-data-table>
    <v-data-table
      v-else
      group-by="name"
      show-group-by
      :headers="headers"
      :search="search"
      :items="items"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      loader-height="10"
      :loading="loading"
      loading-text="กำลังค้นหาข้อมูล..."
      hide-default-footer
      class="elevation-1 ma-2"
      @page-count="pageCount = $event"
      @click:row="handleClick"
    >
      <template #footer>
        <div class="text-center pb-1 mx-5">
          <v-pagination
            v-model="page"
            :length="pageCount"
            total-visible="20"
            circle
          ></v-pagination>
        </div>
      </template>
    </v-data-table>
    <!-- <div class="text-center pb-1 mx-5">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div> -->
  </v-card>
</template>
<script>
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    itemsSubHeader: {
      type: Array,
      default: () => [],
    },
    receipts: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    chip: {
      type: Boolean,
      default: false,
    },
    btn: {
      type: Boolean,
      default: false,
    },
    btnSelect: {
      type: String,
      default: 'ใบเสร็จรับเงินทั้งหมด',
    },
    target: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Object,
      default: () => ({
        start: '2021-11-05',
        end: '2021-11-30',
      }),
    },
    showDateInput: {
      type: Boolean,
      default: false,
    },
    showSelectInput: {
      type: Boolean,
      default: false,
    },
    itemsForSelect: {
      type: Array,
      default: () => [],
    },
    excelFirstCol: {
      type: Boolean,
      default: false,
    },
    secondRow: {
      type: Boolean,
      default: false,
    },
    thirdRow: {
      type: Boolean,
      default: false,
    },

    groupBy: {
      type: Boolean,
      default: false,
    },
    disableAddButton: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      date: ['2021-11-05', '2021-11-30'],
      menu: false,
      goal: '5,000',
      select: 'all',
      textSelect: 'ทั้งหมด',
    }
  },

  computed: {
    dateRangeText() {
      if (this.date.length > 1) {
        return (
          this.$options.filters.dateTh(this.date[0]) +
          ' ถึง ' +
          this.$options.filters.dateTh(this.date[1])
        )
      } else {
        return this.$options.filters.dateTh(this.date[0])
      }
      // return this.date.join(' ถึง ')
    },
  },
  watch: {
    goal(newValue) {
      const result = newValue
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.$nextTick(() => {
        this.goal = result
      })
    },
  },
  created() {
    // let fourDaysAgo = moment()
    // fourDaysAgo = fourDaysAgo.subtract(9, 'days')
    // fourDaysAgo = fourDaysAgo.format('YYYY-MM-DD')
    // console.log(fourDaysAgo, moment().format('YYYY-MM-DD'))
    this.date[0] = moment(this.time.start).format('YYYY-MM-DD')
    this.date[1] = moment(this.time.end).format('YYYY-MM-DD')
    this.getDateRange()
  },
  methods: {
    getDaysArray(start, end) {
      const now = start.clone()
      const dates = []
      // eslint-disable-next-line no-unmodified-loop-condition
      while (now.isSameOrBefore(end)) {
        dates.push(now.format('YYYY-MM-DD'))
        now.add(1, 'days')
      }
      return dates
    },
    getDateRange() {
      // console.log(this.date)
      const dayList = this.getDaysArray(
        moment(this.date[0]),
        moment(this.date[1] || moment(this.date[0]))
      )
      this.$emit('getDateRange', { dayList, goal: this.goal })
      // console.log(daylist)
    },
    getDateRangeForKeyPress() {
      const dayList = this.getDaysArray(
        moment(this.date[0]),
        moment(this.date[1] || moment(this.date[0]))
      )
      setTimeout(() => {
        this.$emit('getDateRange', { dayList, goal: this.goal })
      }, 1500)
    },
    onExport() {
      const dataWS = XLSX.utils.json_to_sheet(this.items)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, dataWS)
      XLSX.writeFile(
        wb,
        `${this.title}${
          this.showDateInput ? '-' + this.dateRangeText : ''
        }.xlsx`
      )
    },
    textColor(value) {
      if (value > 0) {
        return 'green--text'
      } else if (value < 0) {
        return 'red--text'
      } else {
        return 'black--text'
      }
    },
    textReceiptColor(value) {
      if (value === 'การขาย') {
        return 'green--text'
      } else if (value === 'คืนเงิน') {
        return 'yellow--text'
      } else {
        return 'red--text'
      }
    },
    handleClick(value) {
      // console.log(value)
      this.$emit('openDrawer', value)
    },
    sendValueSelectToParent() {
      // console.log(this.select)
      const res = this.itemsForSelect.find((f) => f.value === this.select)
      this.textSelect = res.text
      this.$emit('receiveDataSelectFromChild', this.select)
    },
  },
}
</script>
