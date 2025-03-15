"use client"
import React, { FC, useState, useEffect, useRef } from 'react'
import CopyToClipboard from './copy-to-clipboard'
import { ArrowUpRight, Pencil, MoreVertical } from 'lucide-react'
import Link from 'next/link';

interface FormCardProps {
    formId: string; 
    workspaceId: string,
    title: string; 
    status: boolean,
    submissions: number,
}

const FormCard: FC<FormCardProps> = ({formId, workspaceId, title, status, submissions}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleCloseMenus = (e: CustomEvent) => {
      if (e.detail.formId !== formId) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('close-form-menus', handleCloseMenus as EventListener)
    return () => window.removeEventListener('close-form-menus', handleCloseMenus as EventListener)
  }, [formId])

  const handleMenuToggle = () => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)
    if (newState) {
      window.dispatchEvent(new CustomEvent('close-form-menus', { detail: { formId } }))
    }
  }

  const handleMenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false)
    }, 2000)
  }

  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="w-full h-[150px] max-h-[150px] flex flex-col justify-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="h-[40%] flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-800 text-sm">
            {title}
          </h3>
        </div>
        <div className="relative" ref={menuRef}>
          <button 
            onClick={handleMenuToggle}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical size={20} className="text-gray-600" />
          </button>

          {isMenuOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10"
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
            >
              <div className="p-2 space-y-1">
                <Link 
                  href={`/workspaces/${workspaceId}/${formId}/builder`} 
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Pencil size={16} />
                  Edit Form
                </Link>

                <Link 
                  href={`/workspaces/${workspaceId}/${formId}/submission`} 
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors whitespace-nowrap"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ArrowUpRight size={16} />
                  Submissions
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className=" h-[60%] flex flex-col justify-center gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Status</span>
          <div className="flex items-center gap-2">
            {status ? (
              <div className="flex items-center gap-1.5 text-green-600 font-medium text-sm">
                <span className="hidden sm:inline">Published</span>
                <CopyToClipboard
                  textToCopy={`http://localhost:3000/submit/${formId}`}
                  className="p-1.5 hover:bg-green-50 rounded-md"
                />
              </div>
            ) : (
              <span className="text-gray-500 font-medium text-sm">Draft</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Submissions</span>
          <span className="text-gray-800 font-medium text-sm">{submissions}</span>
        </div>
      </div>
    </div>
  )
}

export default FormCard