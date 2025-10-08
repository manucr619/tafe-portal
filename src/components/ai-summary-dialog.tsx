"use client"

import { DeliveryRequest } from "@/app/dashboard/mock-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { IconSparkles, IconTrendingUp, IconAlertCircle, IconPackage } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { TypingText } from "@/components/typing-text"

interface AISummaryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  deliveryRequests: DeliveryRequest[]
}

export function AISummaryDialog({ open, onOpenChange, deliveryRequests }: AISummaryDialogProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [visibleSections, setVisibleSections] = useState(0)

  // Reset and start animation when dialog opens
  useEffect(() => {
    if (open) {
      setIsGenerating(true)
      setVisibleSections(0)
      
      // Progressively show sections
      const timers: NodeJS.Timeout[] = []
      const sectionDelays = [500, 800, 1200, 1600, 2000, 2400] // Delays for each section
      
      sectionDelays.forEach((delay, index) => {
        const timer = setTimeout(() => {
          setVisibleSections(index + 1)
          if (index === sectionDelays.length - 1) {
            setIsGenerating(false)
          }
        }, delay)
        timers.push(timer)
      })

      return () => {
        timers.forEach(timer => clearTimeout(timer))
      }
    }
  }, [open])

  // Generate AI summary insights
  const generateSummary = () => {
    const total = deliveryRequests.length
    const statusBreakdown = deliveryRequests.reduce((acc, dr) => {
      acc[dr.status] = (acc[dr.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const plantBreakdown = deliveryRequests.reduce((acc, dr) => {
      acc[dr.plant] = (acc[dr.plant] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const totalQty = deliveryRequests.reduce((sum, dr) => sum + dr.requestQty, 0)
    const avgQty = total > 0 ? Math.round(totalQty / total) : 0

    const pendingCount = (statusBreakdown["Pending for Print"] || 0) + 
                        (statusBreakdown["Pending for Invoice Updation"] || 0)
    const completedCount = (statusBreakdown["Closed"] || 0) + 
                          (statusBreakdown["Received"] || 0)
    const inProgressCount = (statusBreakdown["Invoice Updated"] || 0) + 
                           (statusBreakdown["At Gate"] || 0)

    // Find most common plant
    const mostCommonPlant = Object.entries(plantBreakdown)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A"

    // Recent trends (last 7 days)
    const recentDRs = deliveryRequests.filter(dr => {
      const drDate = new Date(dr.date)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return drDate >= sevenDaysAgo
    })

    return {
      total,
      statusBreakdown,
      plantBreakdown,
      totalQty,
      avgQty,
      pendingCount,
      completedCount,
      inProgressCount,
      mostCommonPlant,
      recentDRs: recentDRs.length,
      completionRate: total > 0 ? Math.round((completedCount / total) * 100) : 0,
    }
  }

  const summary = generateSummary()

  // Generate recommendation text
  const getRecommendationText = () => {
    if (summary.pendingCount > summary.completedCount) {
      return `Focus on processing the ${summary.pendingCount} pending DRs to improve workflow efficiency. Consider prioritizing print and invoice updates to maintain smooth operations.`
    } else if (summary.completionRate >= 70) {
      return `Excellent progress! Your completion rate of ${summary.completionRate}% indicates healthy workflow. Continue maintaining this momentum.`
    } else {
      return `Your workflow is balanced with ${summary.inProgressCount} DRs in progress. Monitor these to ensure timely completion.`
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <IconSparkles className="h-6 w-6 text-purple-500" />
            <DialogTitle>AI Summary - Delivery Requests</DialogTitle>
          </div>
          <DialogDescription>
            Intelligent insights and analysis of your delivery requests
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Loading State */}
          {isGenerating && (
            <div className="flex items-center gap-2 p-3 rounded-lg border bg-purple-50 dark:bg-purple-950/20">
              <IconSparkles className="h-4 w-4 text-purple-600 animate-spin" />
              <p className="text-sm text-purple-800 dark:text-purple-200">
                Analyzing delivery requests...
              </p>
            </div>
          )}

          {/* Overview Section */}
          {visibleSections >= 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <IconPackage className="h-4 w-4" />
              Overview
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">Total DRs</p>
                <p className="text-2xl font-bold">{summary.total}</p>
              </div>
              <div className="p-3 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">Total Quantity</p>
                <p className="text-2xl font-bold">{summary.totalQty}</p>
              </div>
              <div className="p-3 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">Avg. Quantity</p>
                <p className="text-2xl font-bold">{summary.avgQty}</p>
              </div>
              <div className="p-3 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-green-600">{summary.completionRate}%</p>
              </div>
            </div>
          </div>
          )}

          {visibleSections >= 2 && <Separator className="animate-in fade-in duration-300" />}

          {/* Status Analysis */}
          {visibleSections >= 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <IconTrendingUp className="h-4 w-4" />
              Status Analysis
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-yellow-50 dark:bg-yellow-950/20">
                <span className="text-sm font-medium">Pending Actions</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  {summary.pendingCount} DRs
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-blue-50 dark:bg-blue-950/20">
                <span className="text-sm font-medium">In Progress</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {summary.inProgressCount} DRs
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50 dark:bg-green-950/20">
                <span className="text-sm font-medium">Completed</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {summary.completedCount} DRs
                </Badge>
              </div>
            </div>
          </div>
          )}

          {visibleSections >= 3 && <Separator className="animate-in fade-in duration-300" />}

          {/* Key Insights */}
          {visibleSections >= 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <IconAlertCircle className="h-4 w-4" />
              Key Insights
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg border bg-card">
                <p className="text-sm">
                  <span className="font-medium text-purple-600">📊 Primary Plant: </span>
                  <span className="text-muted-foreground">{summary.mostCommonPlant.substring(0, 40)}...</span>
                </p>
              </div>
              <div className="p-3 rounded-lg border bg-card">
                <p className="text-sm">
                  <span className="font-medium text-purple-600">📈 Recent Activity: </span>
                  <span className="text-muted-foreground">
                    {summary.recentDRs} DR{summary.recentDRs !== 1 ? 's' : ''} created in the last 7 days
                  </span>
                </p>
              </div>
              {summary.pendingCount > 0 && (
                <div className="p-3 rounded-lg border bg-orange-50 dark:bg-orange-950/20">
                  <p className="text-sm">
                    <span className="font-medium text-orange-600">⚠️ Action Required: </span>
                    <span className="text-muted-foreground">
                      {summary.pendingCount} DR{summary.pendingCount !== 1 ? 's' : ''} require{summary.pendingCount === 1 ? 's' : ''} immediate attention
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          )}

          {visibleSections >= 4 && <Separator className="animate-in fade-in duration-300" />}

          {/* Status Breakdown */}
          {visibleSections >= 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-semibold mb-3">Detailed Status Breakdown</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(summary.statusBreakdown).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between p-2 rounded border bg-card">
                  <span className="text-xs text-muted-foreground">{status}</span>
                  <Badge variant="outline" className="text-xs">{count}</Badge>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* AI Recommendation */}
          {visibleSections >= 5 && (
          <div className="p-4 rounded-lg border-2 border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-950/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start gap-2">
              <IconSparkles className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                  AI Recommendation
                </h4>
                <TypingText text={getRecommendationText()} speed={20}>
                  {(displayText, isComplete) => (
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      {displayText}
                      {!isComplete && <span className="animate-pulse">▊</span>}
                    </p>
                  )}
                </TypingText>
              </div>
            </div>
          </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

