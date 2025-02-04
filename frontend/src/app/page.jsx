"use client"
import React, { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material"
import { Search, Refresh, Add, Visibility, Edit, Delete, KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material"

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(2)
  const [selectedJobs, setSelectedJobs] = useState([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sortField, setSortField] = useState("")
  const [sortOrder, setSortOrder] = useState("desc")
  const [filters, setFilters] = useState({})
  const [error, setError] = useState("")

 const fetchJobs = async () => {
    setLoading(true)
    try {
      const payload = {
        page,
        maxResults: rowsPerPage,
        sortField,
        sortOrder,
        ...filters,
      }

      const response = await axios.post("http://localhost:8080/job/paginatedListByCriteria", payload, {
        headers: { "Content-Type": "application/json" },
      })

      const data = response.data
      setJobs(data.list || [])
      setTotal(data.dataSize || 0)
      setError("")
    } catch (error) {
      console.error("Error fetching jobs:", error)
      setError("Erreur lors du chargement des JOBS")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [page, rowsPerPage, sortField, sortOrder])

  const handleSort = (column) => {
    const isAsc = sortField === column && sortOrder === "asc"
    setSortOrder(isAsc ? "desc" : "asc")
    setSortField(column)
  }

  const handleSelectAll = (event) => {
    setSelectedJobs(event.target.checked ? jobs : [])
  }

  const handleSelectJob = (job) => {
    setSelectedJobs((prevSelected) => {
      const isSelected = prevSelected.find((h) => h.id === job.id)
      return isSelected ? prevSelected.filter((h) => h.id !== job.id) : [...prevSelected, job]
    })
  }

  const handleDelete = async () => {
    const selectedJobsToSend = selectedJobs.map((selectedJob) => selectedJob.id)
    try {
      await fetch("http://localhost:8080/job/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedJobsToSend),
      })
      setDeleteDialogOpen(false)
      setSelectedJobs([])
      fetchJobs()
      setError("")
    } catch (error) {
      setError("Erreur lors de la suppression")
    }
  }

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null
    return sortOrder === "asc" ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" />
  }

  

  return (
    <div className="container-fluid mt-4">
      {/* Search Card */}
      <Paper className="p-4 mb-4">
        <Typography variant="h6" className="mb-3">
          Recherche des JOBS
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="col-md-4">
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={filters.titleLike || ""}
              onChange={(e) => setFilters({ ...filters, titleLike: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={filters.locationLike || ""}
              onChange={(e) => setFilters({ ...filters, locationLike: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <TextField
              fullWidth
              label="Salary"
              type="number"
              variant="outlined"
              value={filters.salary || ""}
              onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => {
              setFilters({titleLike: "", locationLike: "", salary: 0 })
              fetchJobs()
            }}
            className="me-2"
          >
            Réinitialiser
          </Button>
          <Button variant="contained" startIcon={<Search />} onClick={fetchJobs}>
            Rechercher
          </Button>
        </div>
      </Paper>

      {/* Results Card */}
      <Paper className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Typography variant="h6">Liste des JOBS ({total})</Typography>
          <div className="flex justify-end">
            {selectedJobs.length > 0 && (
              <IconButton color="error" onClick={() => setDeleteDialogOpen(true)} className="me-2">
                <Delete />
              </IconButton>
            )}
            <Button variant="contained" startIcon={<Add />} component={Link} href="/crud_Job/Add_Edit_Job">
              Ajouter
            </Button>
          </div>
        </div>

        {error && (
          <Alert severity="error" className="mb-3">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={jobs.length > 0 && selectedJobs.length === jobs.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell onClick={() => handleSort("id")}>
                    Id <SortIcon field="id" />
                  </TableCell>
                  <TableCell onClick={() => handleSort("title")}>
                    Title <SortIcon field="title" />
                  </TableCell>
                  <TableCell onClick={() => handleSort("location")}>
                    Location <SortIcon field="location" />
                  </TableCell>
                  <TableCell onClick={() => handleSort("salary")}>
                    Salary <SortIcon field="salary" />
                  </TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedJobs.some((h) => h.id === job.id)}
                        onChange={() => handleSelectJob(job)}
                      />
                    </TableCell>
                    <TableCell>{job.id}</TableCell>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.salary}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        component={Link}
                        href={{ pathname: "/crud_Job/View_Job", query: { id: job.id } }}
                        color="primary"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        component={Link}
                        href={{ pathname: "/crud_Job/Add_Edit_Job", query: { id: job.id } }}
                        color="secondary"
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <select
              className="form-select"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              {[2, 10, 50].map((size) => (
                <option key={size} value={size}>
                  {size} par page
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <Button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
              Précédent
            </Button>
            <span className="mx-2">
              Page {page + 1} sur {Math.ceil(total / rowsPerPage)}
            </span>
            <Button disabled={page >= Math.ceil(total / rowsPerPage) - 1} onClick={() => setPage((p) => p + 1)}>
              Suivant
            </Button>
          </div>
        </div>
      </Paper>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Voulez-vous supprimer ces éléments ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedJobs.length === 1
              ? "Un travaille va être supprimé"
              : `${selectedJobs.length} jobs vont être supprimés`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}














