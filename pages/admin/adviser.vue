<template>
  <div>
    <Header title="Dashboard" system-bar icon="mdi-chart-box" prominent dense />
    <v-row dense class="ma-2">
      <v-col cols="12" sm="6" lg="3">
        <AdminTopCard
          title="ตัวแทน"
          route-name="admin-adviser"
          to="/admin/adviser"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <AdminTopCard
          title="รายชื่อลูกค้า"
          icon="mdi-receipt"
          route-name="admin-adviser-advise"
          to="/admin/adviser/all"
        />
      </v-col>
    </v-row>
    <nuxt-child></nuxt-child>
  </div>
</template>
