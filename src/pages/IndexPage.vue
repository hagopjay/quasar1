<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Infinite Scroll Generator</div>
    
    <q-infinite-scroll @load="onLoad" :offset="250" class="row q-col-gutter-md">
      <template v-slot="{ index }">
        <div v-for="item in store.items" :key="item.id" class="col-12 col-md-6 col-lg-4">
          <q-card class="generator-card">
            <q-card-section>
              <div class="text-h6">Generated Item #{{ item.id }}</div>
              <div class="q-mt-sm">
                <div class="row q-gutter-sm">
                  <q-chip icon="schedule" color="primary" text-color="white">
                    {{ item.datetime }}
                  </q-chip>
                  <q-chip icon="code" color="secondary" text-color="white">
                    {{ item.randomString }}
                  </q-chip>
                  <q-chip icon="numbers" color="accent" text-color="white">
                    {{ item.randomNumber }}
                  </q-chip>
                  <q-chip :style="{ backgroundColor: item.randomHex }" text-color="white">
                    {{ item.randomHex }}
                  </q-chip>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script setup lang="ts">
import { useGeneratorStore } from 'src/stores/generator'

const store = useGeneratorStore()

// Initial load
store.generateItems()

const onLoad = (index: number, done: () => void) => {
  setTimeout(() => {
    store.generateItems()
    done()
  }, 1000)
}
</script>

<style scoped>
.generator-card {
  transition: all 0.3s ease;
}

.generator-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 25px 0 rgba(0,0,0,0.1);
}
</style>