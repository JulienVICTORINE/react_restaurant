import { useState } from "react";
import { TbUsersGroup } from "react-icons/tb";
import { createClient, createReservation, fetchClient } from "./lib/api";
import toast from "react-hot-toast";
import SuccessPage from "./SuccessPage";

function FormTable({ tables, setFormData, formData }) {
  const [selectedTable, setSelectedTable] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    toast.promise(fetchReservation(), {
      loading: "Réservation en cours...",
      success: <b>Réservation faite !</b>,
      error: <b>Erreur lors de la réservation.</b>,
    });
  }

  async function fetchReservation() {
    setClicked(true);
    // Vérifier si l'utilisateur existe
    let idUser = await fetchClient(formData.email);
    if (!idUser) {
      // S'il n'existe pas, alors on créé l'utilisateur
      idUser = await createClient(
        formData.nom,
        formData.email,
        formData.telephone
      );
    }
    // On créé la réservation
    await createReservation(formData, idUser, selectedTable);
    setClicked(false);
    setShowSuccess(true);
  }

  return showSuccess ? (
    <SuccessPage formData={formData} />
  ) : (
    <div className="flex flex-col space-y-4 justify-center items-center w-2xl">
      <h1>Choisir une table</h1>
      <fieldset className="space-y-3">
        <legend className="sr-only">Tables</legend>

        {tables.map((table) => (
          <div
            key={table.id}
            onClick={(e) =>
              setSelectedTable("/api/table_restaurants/" + table.id)
            }
          >
            <label
              htmlFor="tables"
              className="w-xl flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600"
            >
              <p className="text-gray-700">Table n°{table.numero}</p>

              <p className="flex items-center gap-x-2 text-gray-900">
                <TbUsersGroup /> {table.capacite}
              </p>

              <input
                type="radio"
                name="tables"
                className="sr-only"
                checked={selectedTable == "/api/table_restaurants/" + table.id}
              />
            </label>
          </div>
        ))}
      </fieldset>
      <button
        className="btn btn-primary"
        onClick={handleClick}
        disabled={clicked}
      >
        Reserver cette table
      </button>
    </div>
  );
}

export default FormTable;
