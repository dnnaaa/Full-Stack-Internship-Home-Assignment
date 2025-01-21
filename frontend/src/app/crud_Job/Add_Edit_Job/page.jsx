"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material"
import { ArrowBack, Refresh, Save } from "@mui/icons-material"

export default function JobForm() {
  const router = useRouter()
  const [id, setId] = useState(null)
  const [isUpdate, setIsUpdate] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    location: "",
    salary: 0,
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const idTemp = urlParams.get("id") || undefined
    setIsUpdate(Boolean(idTemp))
    setId(idTemp)
  }, [])

  useEffect(() => {
    if (isUpdate && id) {
      fetchJob(id)
    }
  }, [isUpdate, id])

  const fetchJob = async (jobId) => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8080/job/${jobId}`)
      const data = await response.json()
      setFormData(data)
    } catch (error) {
      setError("Erreur lors du chargement de l'hôpital")
      router.back()
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const validateForm = () => {
    if (!formData.title || !formData.description) {
      setError("Veuillez remplir tous les champs obligatoires")
      return false
    }
    if (formData.description.length > 255) {
      setError("La description ne doit pas dépasser 255 caractères")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    setError("")
    setSuccess("")

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch("http://localhost:8080/job" + (isUpdate ? "/" + formData.id : ""), {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }

      setSuccess("L'action a été enregistrée avec succès")
      setTimeout(() => {
        router.back()
      }, 1500)
    } catch (err) {
      setError(err.message || "Une erreur s'est produite")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      id: null,
      title: "",
      description: "",
      location: "",
      salary: 0,
    })
    setSubmitted(false)
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <Paper elevation={3} className="p-4">
        <Typography variant="h5" gutterBottom>
          {isUpdate ? "Modification du job" : "Ajout d'un job"}
        </Typography>

        {error && (
          <Alert severity="error" className="mb-3">
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" className="mb-3">
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                error={submitted && !formData.title}
                helperText={submitted && !formData.title ? "Ce champ est obligatoire" : ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                error={submitted && !formData.location}
                helperText={submitted && !formData.location ? "Ce champ est obligatoire" : ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="salary">Salary</InputLabel>
                <OutlinedInput
                  id="salary"
                  name="salary"
                  type="number"
                  value={formData.salary}
                  onChange={handleInputChange}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Salary"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                error={formData.description?.length > 255}
                helperText={`${formData.description?.length || 0}/255${formData.description?.length > 255 ? " - La description ne doit pas dépasser 255 caractères" : ""}`}
              />
            </Grid>
          </Grid>

          <div className="flex justify-end mt-4">
            <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => router.back()} className="me-2">
              Retour
            </Button>

            {!isUpdate && (
              <Button variant="outlined" startIcon={<Refresh />} onClick={resetForm} className="me-2">
                Réinitialiser
              </Button>
            )}

            <Button type="submit" variant="contained" startIcon={<Save />} disabled={loading}>
              Enregistrer
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  )
}



























// "use client"
// import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// import { useRouter } from 'next/navigation';

// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { ArrowLeft, RotateCcw, Save } from 'lucide-react';


// export default function JobForm(){
//   // const { id } = useParams();
//   // const isUpdate = Boolean(id);
//   const [id, setId] = useState(null);
//   const [isUpdate, setIsUpdate] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const idTemp = urlParams.get("id") || undefined;
//     setIsUpdate(Boolean(idTemp))
//     setId(idTemp);
//     }, []);
  
//   const [formData, setFormData] = useState({
//     id: null,
//     title: '',
//     description: '',
//     location: '',
//     salary: 0
//   });

//   useEffect(() => {
//     if (isUpdate && id) {
//       fetchJob(id);
//     }
//   }, [isUpdate, id]);

//   const fetchJob = async (jobId) => {
//     try {
//       const response = await fetch(`http://localhost:8080/job/${jobId}`);
//       const data = await response.json();
//       setFormData(data);
//     } catch (error) {
//       setError("Erreur lors du chargement de l'hôpital");
//       // Redirection vers la liste en cas d'erreur
//       window.history.back();
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.title || !formData.description) {
//       setError('Veuillez remplir tous les champs obligatoires');
//       return false;
//     }
//     if (formData.description.length > 255) {
//       setError('La description ne doit pas dépasser 255 caractères');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//     setError('');
//     setSuccess('');

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8080/job' + (isUpdate ? '/'+formData.id : ''), {
//         method: isUpdate ? 'PUT' : 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message);
//       }

//       setSuccess("L'action a été enregistrée avec succès");
//       setTimeout(() => {
//         window.history.back();
//       }, 1500);
//     } catch (err) {
//       setError(err.message || "Une erreur s'est produite");
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       id: null,
//       title: '',
//       description: '',
//       location: '',
//       salary: 0
//     });
//     setSubmitted(false);
//   };

//   const goBack = () => {
//     window.history.back();
//   };

//   return (
//     <div className="p-6">
//       <div className="bg-white rounded-lg shadow-lg">
//         <div className="p-6">
//           <h2 className="text-xl font-semibold mb-6">
//             {isUpdate ? "Modification du job" : "Ajout d'un job"}
//           </h2>

//           {error && (
//             <Alert variant="destructive" className="mb-6">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           {success && (
//             <Alert className="mb-6">
//               <AlertDescription>{success}</AlertDescription>
//             </Alert>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Code */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700 after:content-['*'] after:text-red-500">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   placeholder="Title"
//                 />
//                 {submitted && !formData.title && (
//                   <p className="text-sm text-red-500">Ce champ est obligatoire</p>
//                 )}
//               </div>

//               {/* Nom */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700 after:content-['*'] after:text-red-500">
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   placeholder="Location"
//                 />
//                 {submitted && !formData.location && (
//                   <p className="text-sm text-red-500">Ce champ est obligatoire</p>
//                 )}
//               </div>

//               {/* Code Transmission */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Salary
//                 </label>
//                 <input
//                   type="Number"
//                   name="salary"
//                   value={formData.salary}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   placeholder="Salary"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Description */}
//               <div className="md:col-span-2 space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   rows={2}
//                   className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   placeholder="Description"
//                 />
//                 <div className="text-sm text-gray-500">
//                   {formData.description?.length || 0}/255
//                 </div>
//                 {formData.description?.length > 255 && (
//                   <p className="text-sm text-red-500">
//                     La description ne doit pas dépasser 255 caractères
//                   </p>
//                 )}
//               </div>        
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end space-x-4 mt-6">
//               <button
//                 type="button"
//                 onClick={goBack}
//                 className="flex items-center px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
//               >
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Retour
//               </button>

//               {!isUpdate && (
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="flex items-center px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
//                 >
//                   <RotateCcw className="w-4 h-4 mr-2" />
//                   Réinitialiser
//                 </button>
//               )}

//               <button
//                 type="submit"
//                 className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
//               >
//                 <Save className="w-4 h-4 mr-2" />
//                 Enregistrer
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
