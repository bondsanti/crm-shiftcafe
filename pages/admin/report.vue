<template>
  <div>
    <Header title="Dashboard" system-bar icon="mdi-chart-box" prominent dense />
    <v-row dense class="ma-2">
      <v-col cols="12" sm="6" lg="3">
        <AdminTopCard title="สรุปยอดขาย" route-name="admin-report" />
      </v-col>
      <!-- <v-col cols="12" sm="6" lg="3">
        <AdminTopCard
          title="ยอดขายแยกตามหมวดหมู่"
          icon="mdi-food-off-outline"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <AdminTopCard
          title="ยอดขายแยกตามประเภทการชำระเงิน"
          icon="mdi-cash-register"
        />
      </v-col> -->
      <v-col cols="12" sm="6" lg="3">
        <AdminTopCard
          title="ใบเสร็จรับเงิน"
          icon="mdi-receipt"
          route-name="admin-report-receipt"
        />
      </v-col>
    </v-row>
    <nuxt-child></nuxt-child>
    <!-- <v-row class="ma-3">
      <AdminTable
        title="สรุปยอดขาย"
        icon="mdi-cash"
        :headers="headers"
        :items="items"
        :items-sub-header="itemsSubHeader"
        :loading="loading"
        @getDateRange="getDateRange"
      />
    </v-row> -->
  </div>
</template>
