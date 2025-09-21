"use client"

import React from "react"
import { ChevronDown, User } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export default function ModelSelector({ selectedModel, modelOptions, onModelChange }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-gray-200 hover:bg-gray-50 hover:border-gray-300"
          title={`Current model: ${selectedModel.name}`}
        >
          <img 
            src={selectedModel.image} 
            alt={selectedModel.name}
            className="h-6 w-6 rounded-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs" style={{display: 'none'}}>
            {selectedModel.name.charAt(0)}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="px-2 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Select AI Lawyer
        </div>
        {modelOptions.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onModelChange(model)}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer"
          >
            <img 
              src={model.image} 
              alt={model.name}
              className="h-8 w-8 rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm" style={{display: 'none'}}>
              {model.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {model.name}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {model.description}
              </div>
            </div>
            {selectedModel.id === model.id && (
              <div className="h-2 w-2 rounded-full bg-red-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
