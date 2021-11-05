<template>
  <v-card width="100%">
    <v-card-title class="ma-0 pa-0">
      <v-col align="center" cols="12" md="4" class="mb-0">
        <v-row justify="center">
          <h1 class="font-weight-regular">
            <v-icon size="60">{{ icon }}</v-icon> {{ title }}
          </h1>
        </v-row>
        <v-row justify="center"> {{ dateRangeText }} </v-row>
      </v-col>
      <v-col cols="12" md="8">
        <v-row class="pa-2 mb-0">
          <v-col class="ma-0 mr-2 pa-0">
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
                  text
                  color="primary"
                  @click="$refs.menu.save(date), test()"
                >
                  ตกลง
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  ยกเลิก
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col class="ma-0 pa-0">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="ค้นหา"
              filled
              rounded
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-0">
          <v-chip
            v-for="(item, i) in itemsSubHeader"
            :key="i"
            class="ma-2"
            color="warning"
            text-color="white"
          >
            {{ item.value }} {{ item.text }}
            <v-icon right> {{ item.icon }} </v-icon>
          </v-chip>
        </v-row>
      </v-col>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="items"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1 ma-2"
      @page-count="pageCount = $event"
    >
    </v-data-table>
    <div class="text-center py-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </v-card>
</template>
<script>
import moment from 'moment'
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
  },

  data() {
    return {
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      date: ['2021-11-05', '2021-11-30'],
      menu: false,
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
  created() {
    // const daylist = this.getDaysArray(
    //   moment(this.date[0]),
    //   moment(this.date[1])
    // )
    // console.log(daylist)
  },
  methods: {
    getDaysArray(start, end) {
      const now = start.clone()
      const dates = []
      // eslint-disable-next-line no-unmodified-loop-condition
      while (now.isSameOrBefore(end)) {
        dates.push(now.format('DD/MM/YYYY'))
        now.add(1, 'days')
      }
      return dates
    },
    test() {
      // console.log(this.date)
      const daylist = this.getDaysArray(
        moment(this.date[0]),
        moment(this.date[1] || moment(this.date[0]))
      )

      console.log(daylist)
    },
  },
}
</script>
