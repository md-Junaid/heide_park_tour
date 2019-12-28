<template>
  <div>
    <Carousel style="clip-path: polygon(0% 0%, 100% 0%, 100% 95%, 51.5% 95%, 50% 100%, 48.5% 95%, 0 95%);" />
    <WelcomeInfo />
    <Map />
  </div>
</template>

<script>
import Carousel from '@/components/homepage/Carousel'
import WelcomeInfo from '@/components/homepage/WelcomeInfo'
import Map from '@/components/homepage/Map'

export default {
  name: 'HomePage',

  components: {
    Carousel,
    WelcomeInfo,
    Map
  }
}
</script>
