import React from "react"
import { screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react"
import { render } from "./test-utils"
import { App } from "./App"

describe('CreditsModal', () => {
  test('opens modal when Credits button is clicked', async () => {
    render(<App />)
    
    const creditsButton = screen.getByText('Credits')
    fireEvent.click(creditsButton)
    
    // Verify modal content is displayed
    expect(await screen.findByText('Aaron Yee')).toBeInTheDocument()
    expect(screen.getByText('Derrin Chong')).toBeInTheDocument()
    expect(screen.getByText('Paul Wheeler')).toBeInTheDocument()
  })

  test('closes modal when Close button is clicked', async () => {
    render(<App />)
    
    // Open the modal
    const creditsButton = screen.getByText('Credits')
    fireEvent.click(creditsButton)
    
    // Wait for modal to be visible
    await screen.findByText('Aaron Yee')
    
    // Find and click the Close button
    const closeButton = screen.getByText('Close')
    fireEvent.click(closeButton)
    
    // Wait for the element to be removed
    await waitForElementToBeRemoved(() => screen.queryByText('Aaron Yee'))
  })
})
