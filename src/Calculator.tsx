import { useState } from 'react'

function APICard (props) {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>{props.title}</h5>
        <a href={props.docs}>API documentation</a>
        <div className='mb-3'>
          <label>Status</label>
          <input className='form-control' value={props.response.status} readOnly />
        </div>
        <pre className='overflow-x-scroll'>{JSON.stringify(props.response.data, undefined, 4)}</pre>
      </div>
    </div>
  )
}

export default function Calculator () {
  const [x, setX] = useState('')
  const [y, setY] = useState('')
  const [drfResponse] = useState({ status: '', data: '' })
  const [ninjaResponse] = useState({ status: '', data: '' })

  return (
    <div>
      <h2>Calculator</h2>
      <form>
        <fieldset>
          <div className='mb-3'>
            <label>𝓍</label>
            <input className='form-control' value={x} onChange={(e) => setX(e.target.value)} type='number' />
          </div>
          <div className='mb-3'>
            <label>𝓎</label>
            <input className='form-control' value={y} onChange={(e) => setY(e.target.value)} type='number' />
          </div>
        </fieldset>

        <div className='row'>
          <div className='col-6'>
            <APICard title='Ninja' docs='/ninja/api/docs' response={ninjaResponse} />
          </div>
          <div className='col-6'>
            <APICard title='Django REST Framework' docs='/drf/api/schema/redoc/' response={drfResponse} />
          </div>
        </div>
      </form>
    </div>
  )
}
