 <!-- ======= Contact Section ======= -->
 <template>
 <section id="contact" class="contact">
    <div class="container" data-aos="fade-up">

      <div class="section-title">
        <h2>Kontak</h2>
      </div>
      <div class="content">
        <p>Kami sangat senang mendengar dari Anda dan siap membantu dengan segala kebutuhan Anda. Jangan ragu untuk menghubungi kami jika Anda membutuhkan informasi tambahan atau konsultasi terkait produk kami.<br/>
           Terima kasih atas perhatian dan kepercayaan Anda kepada kami. Kami berharap dapat melayani Anda dengan sebaik-baiknya.</p>
        <p>Untuk informasi lebih lanjut tentang produk kami atau jika Anda memiliki pertanyaan, silakan hubungi kami melalui kontak di bawah ini:</p>
      </div>

      <div class="row">
        <div class="col-lg-5 d-flex align-items-stretch">
          <div class="info">
            <div class="address">
              <i class="bi bi-geo-alt"></i>
              <h4>Lokasi:</h4>
              <p>Jl. Ahmad Yani, Perumahan Bumi Resik Indah Blok B-18 No. 09, Sukamanah, Cipedes, Tasikmalaya.</p>
            </div>

            <div class="email">
              <i class="bi bi-envelope"></i>
              <h4>E-mail:</h4>
              <p>ferarifa87@gmail.com</p>
            </div>

            <div class="phone">
              <i class="bi bi-phone"></i>
              <h4>Telepon:</h4>
              <p>+6281323157881</p>
            </div>

            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d494.66637230636786!2d108.238765!3d-7.316667!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f594966bdc0b1%3A0xb9e949f913e9dc64!2sFera%20Rifa%20D&#39;lemonie!5e0!3m2!1sid!2sid!4v1688181383101!5m2!1sid!2sid" frameborder="0" style="border:0; width: 100%; height: 290px;" allowfullscreen></iframe>
          </div>
        </div>

        <div class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
          <form @submit="sendEmail" role="form" class="php-email-form">
            <div class="row">
              <div class="form-group col-md-6">
                <label for="name-input">Nama Lengkap</label>
                <input type="text" v-model="name" class="form-control" id="name" autocomplete="name" required>
              </div>
              <div class="form-group col-md-6">
                <label for="email-input">E-mail</label>
                <input type="email" v-model="email" class="form-control" name="email" id="email" autocomplete="email" required>
              </div>
            </div>
            <div class="form-group">
              <label for="subject-input">Subjek</label>
              <input type="text" v-model="subject" class="form-control" name="subject" id="subject" autocomplete="subject" required>
            </div>
            <div class="form-group">
              <label for="message-input">Pesan</label>
              <textarea v-model="message" class="form-control" name="message" id="message" rows="10" autocomplete="message" required></textarea>
            </div>
            <div class="my-3">
              <div v-if="isLoading" class="loading-overlay">
                <div class="loader"></div>
              </div>
              <div v-if="successMessage && !isLoading" class="alert alert-success fade show" role="alert">
                {{ successMessage }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeAlert">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div v-if="errorMessage && !isLoading" class="alert alert-danger fade show" role="alert">
                {{ errorMessage }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeAlert">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div v-if="!isLoading && !successMessage && !errorMessage" class="text-center">
              <button type="submit" id="submit-btn">Kirim Pesan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import axios from 'axios';
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

function sendEmail(event) {
  event.preventDefault();
  isLoading.value = true;

  const formData = {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  };

  axios.post('https://ferarifadlemonie.vercel.app/send-email', formData) 
    .then(response => {
      console.log(response.data);
      successMessage.value = 'Pesan Email Anda telah terkirim, Terima Kasih.';
      isLoading.value = false;
      setTimeout(() => {
        successMessage.value = '';
      }, 5000);
    })
    .catch(error => {
      console.error(error);
      errorMessage.value = 'Terjadi kesalahan saat mengirim email.';
      isLoading.value = false;
    });
}

function closeAlert() {
  successMessage.value = '';
  errorMessage.value = '';
}
</script>
