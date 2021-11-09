<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    bottom
    temporary
    right
    width="350"
    fixed
  >
    <v-app-bar color="grey darken-2" elevation="4"
      ><v-btn small fab color="grey darken-1" @click="drawer = false"
        ><v-icon>mdi-close</v-icon></v-btn
      ><v-spacer></v-spacer> <Logo width="60" height="60" />
      <v-spacer></v-spacer
    ></v-app-bar>
    <v-container>
      <v-row justify="center">
        <v-col class="ma-3">
          <v-row justify="end"
            ><div :class="textReceiptColor(receiptDetail.receipt_type)">
              {{ receiptDetail.receipt_type }}
              {{ receiptDetail.refund_for || '' }}
            </div>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" align="center" class="ma-0 pa-0">
              <h1>{{ receiptDetail.total_money | currencyTwoDot }}บาท</h1>
            </v-col>
            <h4>รวมทั้งหมด</h4>
          </v-row>
        </v-col>
      </v-row>
      <hr />
      <v-row>
        <v-col cols="12">
          <p class="pa-0 ma-0">รายการออเดอร์: {{ receiptDetail.order }}</p>
          <p class="pa-0 ma-0">แคชเชียร์: {{ receiptDetail.employee_id }}</p>
          <p class="pa-0 ma-0">
            ระบบขายหน้าร้าน: {{ receiptDetail.pos_device_id }}
          </p>
        </v-col>
      </v-row>
      <hr v-show="receiptDetail.customer_id" />
      <v-row v-show="receiptDetail.customer_id">
        <v-col cols="12">
          <p class="pa-0 ma-0">
            ลูกค้า:
            {{
              receiptDetail.customer_id ? receiptDetail.customer_id.name : ''
            }}
          </p>
          <p class="pa-0 ma-0">
            {{
              receiptDetail.customer_id
                ? receiptDetail.customer_id.phone_number
                : ''
            }}
          </p>
          <p class="pa-0 ma-0">
            {{
              receiptDetail.customer_id ? receiptDetail.customer_id.email : ''
            }}
          </p>
        </v-col>
      </v-row>
      <hr />
      <v-row>
        <v-col>
          <h2>{{ receiptDetail.dining_option }}</h2>
        </v-col>
      </v-row>
      <hr />
      <v-row>
        <v-col class="ma-4">
          <v-row v-for="(item, i) in receiptDetail.line_items" :key="i">
            <v-col cols="9" class="ma-0 pa-0">{{
              `${item.item_name} ${
                item.variant_name ? '(' + item.variant_name + ')' : ''
              }`
            }}</v-col>
            <v-col cols="3" align="end" class="ma-0 pa-0">{{
              item.price | currencyTwoDot
            }}</v-col>
            <v-col cols="12" class="ma-0 pa-0"
              ><div class="caption">
                {{ item.quantity }}*{{ item.price | currencyTwoDot }}
              </div></v-col
            >
            <v-col v-show="item.line_note" cols="12" class="ma-0 pa-0"
              ><div class="caption">{{ `${item.line_note}` }}</div></v-col
            >
          </v-row>
        </v-col>
      </v-row>
      <hr v-show="receiptDetail.total_discounts.length !== 0" />
      <v-row v-show="receiptDetail.total_discounts.length !== 0">
        <v-col class="my-4">
          <v-row v-for="(item, i) in receiptDetail.total_discounts" :key="i">
            <v-col class="my-0 py-0" cols="9">{{ item.name }} </v-col>
            <v-col class="my-0 py-0" cols="3" align="end">
              - {{ item.money_amount }}
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <hr />
      <v-row>
        <v-col class="ma-4">
          <v-row>
            <v-col cols="6" class="ma-0 pa-0"><h2>รวมทั้งหมด</h2></v-col>
            <v-col cols="6" align="end" class="ma-0 pa-0"
              ><h2>
                {{ receiptDetail.total_money | currencyTwoDot }}
              </h2></v-col
            >
          </v-row>
          <v-row v-for="(item, i) in receiptDetail.payments" :key="i">
            <v-col cols="6" class="ma-0 pa-0">{{ item.name }}</v-col>
            <v-col cols="6" align="end" class="ma-0 pa-0">{{
              item.money_amount | currencyTwoDot
            }}</v-col>
          </v-row>
        </v-col>
      </v-row>
      <hr />
      <v-row>
        <v-col class="ma-4">
          <v-row>
            <v-col cols="8" class="ma-0 pa-0">{{
              receiptDetail.receipt_date | dateThWithTime
            }}</v-col>
            <v-col cols="4" align="end" class="ma-0 pa-0"
              >No {{ receiptDetail.receipt_number }}</v-col
            >
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <Footer color="grey darken-2" />
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    receiptDetail: {
      type: Object,
      default: () => ({
        cancelled_at: null,
        created_at: null,
        customer_id: null,
        dining_option: null,
        employee_id: null,
        line_items: [],
        note: null,
        order: null,
        payments: [],
        points_balance: null,
        points_deducted: null,
        points_earned: null,
        pos_device_id: null,
        receipt_date: null,
        receipt_number: null,
        receipt_type: null,
        refund_for: null,
        source: null,
        store_id: null,
        surcharge: null,
        tip: null,
        total_discount: null,
        total_discounts: [],
        total_money: null,
        total_tax: null,
        total_taxes: null,
        updated_at: null,
      }),
    },
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    textReceiptColor(value) {
      if (value === 'การขาย') {
        return 'green--text'
      } else if (value === 'คืนเงิน') {
        return 'yellow--text'
      } else {
        return 'red--text'
      }
    },
  },
}
</script>
