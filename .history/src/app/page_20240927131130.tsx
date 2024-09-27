'use client'

import { useState } from 'react'
import { Switch } from '@headlessui/react'
import html2canvas from 'html2canvas'

interface ChecklistItem {
  id: number
  criteria: string
  cumple: boolean
  noCumple: boolean
  noAplica: boolean
}

interface RequirementItem {
  id: string
  description: string
  priority: string
  status: string
  lastUpdated: string
  acceptanceCriteria: string
  complexity: string
  deliverables: string
  testScenarios: string
  stakeholder: string
}

const initialChecklist: ChecklistItem[] = [
  { id: 1, criteria: '¿El tiempo de respuesta en los procesos es el esperado?', cumple: false, noCumple: false, noAplica: false },
  { id: 2, criteria: '¿Se especifican los criterios de seguridad en el sistema?', cumple: false, noCumple: false, noAplica: false },
  { id: 3, criteria: '¿El proceso está cuantificado en cantidad de usuarios y ancho de banda?', cumple: false, noCumple: false, noAplica: false },
  { id: 4, criteria: '¿Se especificaron posibles fallas en el sistema?', cumple: false, noCumple: false, noAplica: false },
  { id: 5, criteria: '¿Se definieron contingencias a posibles fallas?', cumple: false, noCumple: false, noAplica: false },
  { id: 6, criteria: '¿Hay estrategias de detección de errores en el sistema?', cumple: false, noCumple: false, noAplica: false },
  { id: 7, criteria: '¿Se especifican requisitos mínimos de hardware para la implementación del sistema?', cumple: false, noCumple: false, noAplica: false },
]

const initialRequirements: RequirementItem[] = Array(5).fill(null).map((_, index) => ({
  id: ``,
  description: '',
  priority: '',
  status: '',
  lastUpdated: '',
  acceptanceCriteria: '',
  complexity: '',
  deliverables: '',
  testScenarios: '',
  stakeholder: '',
}))

export default function Home() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist)
  const [requirements, setRequirements] = useState<RequirementItem[]>(initialRequirements)

  const handleChecklistChange = (id: number, field: 'cumple' | 'noCumple' | 'noAplica') => {
    setChecklist(checklist.map(item => {
      if (item.id === id) {
        const newItem = { ...item, [field]: !item[field] }
        if (newItem[field]) {
          newItem.cumple = field === 'cumple'
          newItem.noCumple = field === 'noCumple'
          newItem.noAplica = field === 'noAplica'
        }
        return newItem
      }
      return item
    }))
  }

  const handleRequirementChange = (id: string, field: keyof RequirementItem, value: string) => {
    setRequirements(requirements.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const addRequirement = () => {
    const newId = `REQ00${requirements.length + 1}`
    setRequirements([...requirements, {
      id: newId,
      description: '',
      priority: '',
      status: '',
      lastUpdated: '',
      acceptanceCriteria: '',
      complexity: '',
      deliverables: '',
      testScenarios: '',
      stakeholder: '',
    }])
  }

  const captureScreenshot = async (elementId: string, fileName: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      const canvas = await html2canvas(element)
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = fileName
      link.click()
    }
  }

  return (
    <main className="container mx-auto p-4">
      <div className="mb-8" id="checklist-table">
        <h2 className="text-2xl font-bold mb-4 text-center">Lista de Chequeo Módulo de Registro de Usuarios</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-2">Criterio o Actividad</th>
              <th className="border p-2">Cumple</th>
              <th className="border p-2">No cumple</th>
              <th className="border p-2">No aplica</th>
            </tr>
          </thead>
          <tbody>
            {checklist.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-blue-800' : 'bg-blue-50'}>
                <td className="border p-2">{item.criteria}</td>
                <td className="border p-2">
                  <Switch
                    checked={item.cumple}
                    onChange={() => handleChecklistChange(item.id, 'cumple')}
                    className={`${item.cumple ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className={`${item.cumple ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                  </Switch>
                </td>
                <td className="border p-2">
                  <Switch
                    checked={item.noCumple}
                    onChange={() => handleChecklistChange(item.id, 'noCumple')}
                    className={`${item.noCumple ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className={`${item.noCumple ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                  </Switch>
                </td>
                <td className="border p-2">
                  <Switch
                    checked={item.noAplica}
                    onChange={() => handleChecklistChange(item.id, 'noAplica')}
                    className={`${item.noAplica ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className={`${item.noAplica ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                  </Switch>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => captureScreenshot('checklist-table', 'lista-de-chequeo.png')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Capturar Tabla 1. Lista de chequeo
        </button>
      </div>

      <div className="mb-8" id="requirements-table">
        <h2 className="text-2xl font-bold mb-4 text-center">Plantilla de trazabilidad de requisitos</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-2">ID Requerimiento</th>
              <th className="border p-2">Descripción del requerimiento</th>
              <th className="border p-2">Tipo Prioridad</th>
              <th className="border p-2">Estado actual</th>
              <th className="border p-2">Última fecha estado registrado</th>
              <th className="border p-2">Criterios de aceptación</th>
              <th className="border p-2">Nivel de complejidad</th>
              <th className="border p-2">Entregables</th>
              <th className="border p-2">Escenarios de pruebas</th>
              <th className="border p-2">Interesado en el requisito</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-50'}>
                <td className="border p-2">
                  <input
                    type="text"
                    value={item.id}
                    onChange={(e) => handleRequirementChange(item.id, 'id', e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleRequirementChange(item.id, 'description', e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={item.priority}
                    onChange={(e) => handleRequirementChange(item.id, 'priority', e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={item.status}
                    onChange={(e) => handleRequirementChange(item.id, 'status', e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={item.lastUpdated}
                    onChange={(e) => handleRequirementChange(item.id, 'lastUpdated', e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={item.acceptanceCriteria}
                    onChange={(e) => handleRequirementChange(item.id, 'acceptanceCriteria', e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={item.complexity}
                    onChange={(e) => handleRequirementChange(item.id, 'complexity', e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={item.deliverables}
                    onChange={(e) => handleRequirementChange(item.id, 'deliverables', e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={item.testScenarios}
                    onChange={(e) => handleRequirementChange(item.id, 'testScenarios', e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={item.stakeholder}
                    onChange={(e) => handleRequirementChange(item.id, 'stakeholder', e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between">
          <button
            onClick={addRequirement}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Agregar Requerimiento
          </button>
          <button
            onClick={() => captureScreenshot('requirements-table', 'plantilla-trazabilidad-requisitos.png')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Capturar Plantilla de trazabilidad de requisitos
          </button>
        </div>
      </div>
    </main>
  )
}