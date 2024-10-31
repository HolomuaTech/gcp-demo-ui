import React from "react"
import { screen, fireEvent, waitForElementToBeRemoved, waitFor } from "@testing-library/react"
import { render } from "./test-utils"
import { App, ParticlesEngineProxy } from "./App"

let originInitParticlesEngine = ParticlesEngineProxy.initParticlesEngine

beforeAll(() => {
  // Fake initParticlesEngine to prevent particle effects from ever rendering
  ParticlesEngineProxy.initParticlesEngine = () => {
    // Return a promise that never resolves
    return new Promise(() => { })
  }
})

afterAll(() => {
  ParticlesEngineProxy.initParticlesEngine = originInitParticlesEngine;
})

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

describe('NameForm', () => {
  // Mock fetch before each test
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'Hello, Test User!' }),
      })
    ) as jest.Mock;
  });

  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('submits name and shows success toast', async () => {
    // Create a mock toast function
    const mockToast = jest.fn();
    // Mock useToast to return the mock function
    const useToastMock = jest.spyOn(require('@chakra-ui/react'), 'useToast')
      .mockReturnValue(mockToast);
    
    render(<App />)
    
    const input = screen.getByLabelText(/what is your name/i)
    fireEvent.change(input, { target: { value: 'Test User' } })

    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)

    // Verify fetch was called
    expect(fetch).toHaveBeenCalledWith(
      'https://doe-demo-api-675849533921.us-west1.run.app/submit',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'Test User' }),
      })
    )
    
    // Wait for and verify toast
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
        title: "Response",
        description: "Hello, Test User!",
        status: "success"
      }));
    })

    // Clean up mock
    useToastMock.mockRestore();
  })

  test('handles empty input submission', async () => {
    render(<App />)

    const submitButton = screen.getByText('Submit')

    // Find and click submit button without entering name
    fireEvent.click(submitButton)

    // Verify fetch was called with empty name
    expect(fetch).toHaveBeenCalledWith(
      'https://doe-demo-api-675849533921.us-west1.run.app/submit',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: '' }),
      }
    )
  })

  test('handles API error', async () => {
    // Mock fetch to return an error
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API Error'))
    ) as jest.Mock;

    const mockToast = jest.fn();
    jest.spyOn(require('@chakra-ui/react'), 'useToast').mockImplementation(() => mockToast);

    render(<App />)
    
    // Find and fill the input
    const input = screen.getByLabelText(/what is your name/i)
    fireEvent.change(input, { target: { value: 'Test User' } })

    // Find and click submit button
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)

    // Wait for and verify error toast was called
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
        title: "Error",
        description: "API Error",
        status: "error"
      }));
    });
  })
})
