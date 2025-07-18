function SuccessPage({ formData }) {
  return (
    <div class="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px]">
      <h3 class="text-gray-900 pb-2 text-xl font-bold sm:text-2xl">
        Votre réservation a été effectuée !
      </h3>
      <span class="bg-blue-500 mx-auto mb-6 inline-block h-1 w-[90px] rounded"></span>
      <p class="text-gray-500 mb-10 text-base leading-relaxed">
        Nombre de personnes : {formData.capacite} <br />
        Date de réservation : {formData.dateReservation} <br />
        Nom : {formData.nom} <br />
        E-mail : {formData.email} <br />
      </p>
    </div>
  );
}

export default SuccessPage;
