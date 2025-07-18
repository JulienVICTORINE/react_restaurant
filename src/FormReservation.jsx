import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { fetchTables } from "./lib/api";
import toast from "react-hot-toast";

function FormReservation({
  setShowTable,
  setLoading,
  setTables,
  setFormData,
  formData,
}) {
  async function handleClick() {
    if (
      !formData.nom ||
      !formData.email ||
      !formData.telephone ||
      !formData.capacite ||
      !formData.dateReservation
    ) {
      toast.error("Veuillez remplir tous les champs !");
      return;
    }
    setLoading(true);
    try {
      const data = await fetchTables(
        formData.capacite,
        formData.dateReservation
      );
      setTables(data);
      setShowTable(true);
    } catch (error) {
      console.error(error);
      toast.error("Attention, il y a une erreur !");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col space-y-4 justify-center items-center w-2xl">
      <h1>Reserver une table</h1>
      <label className="input">
        <AiOutlineUser />
        <input
          type="text"
          className="grow"
          placeholder="Nom"
          onInput={(e) => {
            setFormData({ ...formData, nom: e.target.value });
          }}
          required
        />
      </label>
      <label className="input">
        <AiOutlineMail />
        <input
          type="email"
          className="grow"
          placeholder="Email"
          onInput={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          required
        />
      </label>
      <label className="input">
        <MdOutlinePhoneInTalk />
        <input
          type="text"
          className="grow"
          placeholder="Téléphone"
          onInput={(e) => {
            setFormData({ ...formData, telephone: e.target.value });
          }}
          required
        />
      </label>
      <label className="input">
        <AiOutlineUsergroupAdd />
        <input
          type="text"
          className="grow"
          placeholder="Capacité"
          onInput={(e) => {
            setFormData({ ...formData, capacite: e.target.value });
          }}
          required
        />
      </label>
      <label className="input">
        <input
          type="date"
          className="grow"
          placeholder="Date"
          onInput={(e) => {
            setFormData({ ...formData, dateReservation: e.target.value });
          }}
          required
        />
      </label>
      <button className="btn btn-primary" onClick={handleClick}>
        Rechercher une table
      </button>
    </div>
  );
}

export default FormReservation;
