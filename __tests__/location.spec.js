import request from 'supertest'
import { expect } from 'chai'
import app from '../index'
import Location from '../server/models/location'
import SubLocation from '../server/models/sublocations'

describe('Population API', () => {
  before(done => {
    Location.remove({}, err => {
      done()
    })
    SubLocation.remove({}, err => {
      done()
    })
  })

  after(() => {
    process.exit(0)
  })

  describe('Locations', () => {
    /*
     * Test the /POST route
     */
    describe('/POST location', () => {
      let testdata = {
        name: 'Testing',
        female: 30,
        male: 2,
      }
      it('it should throw an error if request body is empty', done => {
        const req = {}
        request(app)
          .post('/api/location')
          .send(req)
          .expect(422)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.status).to.equal(422)
            done()
          })
      })

      it('it should create a location', done => {
        request(app)
          .post('/api/location')
          .send(testdata)
          .expect(201)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            expect(res.body.message).to.equal('successfully created')
            done()
          })
      })

      it('it should fail to create a location with same name', done => {
        request(app)
          .post('/api/location')
          .send(testdata)
          .expect(409)
          .then((err, res) => {
            expect(err.body.message).to.equal('location already exists')
            done()
          })
      })
    })

    it('it should not POST a location without name field', done => {
      let req = {
        female: 30,
        male: 20,
      }
      request(app)
        .post('/api/location')
        .send(req)
        .expect(422)
        .then((err, res) => {
          expect(err.body.message).to.contain('TypeError:')
          done()
        })
    })

    describe('/GET', () => {
      it('it should GET a single location', done => {
        let location = {
          name: 'Nairobi',
          female: 50,
          male: 10,
        }
        request(app)
          .post('/api/location')
          .send(location)
          .expect(201)
          .then((err, res) => {
            request(app)
              .get(`/api/location/${err.body.data._id}`)
              .then((res, err) => {
                expect(res.body.data.name).to.equal('Nairobi')
                done()
              })
          })
      })

      it('does not get locations with invalid Id', done => {
        request(app)
          .get(`/api/location/5c9cdd27da99a2ca95942ain`)
          .then((res, err) => {
            expect(res.body.message).to.contain('Invalid Id')
            done()
          })
      })
    })

    describe('/PUT/', () => {
      it('it should UPDATE a location', done => {
        let location = {
          name: 'test update',
          female: 50,
          male: 10,
        }
        let editlocation = {
          name: 'test update 2',
          female: 500,
          male: 10,
        }
        request(app)
          .post('/api/location')
          .send(location)
          .expect(201)
          .then((err, res) => {
            request(app)
              .put(`/api/location/${err.body.data._id}`)
              .send(editlocation)
              .expect(200)
              .then((res, err) => {
                expect(res.body.data.name).to.equal('test update 2')
                done()
              })
          })
      })

      it('does not update locations with invalid Id', done => {
        request(app)
          .put(`/api/location/5c9cdd27da99a2ca95942ain`)
          .then((res, err) => {
            expect(res.body.error).to.contain('Invalid Id')
            done()
          })
      })

      it('it should not UPDATE with an existing', done => {
        let location = {
          name: 'test update',
          female: 50,
          male: 10,
        }
        let editlocation = {
          name: 'Nairobi',
          female: 500,
          male: 10,
        }
        request(app)
          .post('/api/location')
          .send(location)
          .expect(201)
          .then((err, res) => {
            request(app)
              .put(`/api/location/${err.body.data._id}`)
              .send(editlocation)
              .expect(500)
              .then((res, err) => {
                expect(res.body.error).to.equal('location name already exists')
                done()
              })
          })
      })
    })

    describe('/DELETE/', () => {
      it('it should DELETE a location with a given id', done => {
        let location = {
          name: 'test delete',
          female: 50,
          male: 10,
        }
        request(app)
          .post('/api/location')
          .send(location)
          .expect(201)
          .then((err, res) => {
            request(app)
              .delete(`/api/location/${err.body.data._id}`)
              .send()
              .expect(200)
              .then((res, err) => {
                expect(res.body.message).to.contain('has been deleted')
                done()
              })
          })
      })
    })
  })

  describe('Sublocations', () => {
    describe('POST', () => {
      it(' creates a sublocation', done => {
        let location = {
          name: 'Nairobi Test',
          female: 50,
          male: 10,
        }
        let subLocation = {
          name: 'subNairobi',
          female: 50,
          male: 10,
        }
        request(app)
          .post('/api/location')
          .send(location)
          .expect(201)
          .then((err, res) => {
            request(app)
              .post(`/api/location/${err.body.data._id}/sub/`)
              .send(subLocation)
              .expect(201)
              .then((res, err) => {
                expect(res.body.data.name).to.equal('subNairobi')
                done()
              })
          })
      })

      it('it doesnt create a sublocation with a non existent parent location', done => {
        let subLocation = {
          name: 'subNairobi',
          female: 50,
          male: 10,
        }
        request(app)
          .post(`/api/location/5c9c941b5674da98b689e543/sub/`)
          .send(subLocation)
          .expect(404)
          .then((res, err) => {
            expect(res.body.message).to.equal("Location doesn't exist")
            done()
          })
      })
    })

    describe('GET', () => {
      it('gets a sublocation', done => {
        let location = {
          name: 'Nairobi Test1',
          female: 50,
          male: 10,
        }
        let subLocation = {
          name: 'subNairobi1',
          female: 50,
          male: 10,
        }
        request(app)
          .post('/api/location')
          .send(location)
          .expect(201)
          .then((err, res) => {
            request(app)
              .post(`/api/location/${err.body.data._id}/sub/`)
              .send(subLocation)
              .expect(201)
              .then((res, err) => {
                request(app)
                  .get(
                    `/api/location/${res.body.data.location}/sub/${
                      res.body.data._id
                    }`
                  )
                  .send()
                  .expect(200)
                  .then((res, err) => {
                    expect(res.body.message).to.equal(
                      'succesfully fetched data'
                    )
                    done()
                  })
              })
          })
      })

      it('does not get a non existent sublocation', done => {
        let location = {
          name: 'Nairobi Test2',
          female: 50,
          male: 10,
        }

        request(app)
          .post('/api/location')
          .send(location)
          .expect(201)
          .then((err, res) => {
            request(app)
              .get(
                `/api/location/${
                  err.body.data._id
                }/sub/5c9ce785e21ec7d3cfba88b7`
              )
              .send()
              .expect(404)
              .then((res, err) => {
                expect(res.body.message).to.equal(
                  "SubLocation with Id: 5c9ce785e21ec7d3cfba88b7 doesn't exist"
                )
                done()
              })
          })
      })
    })
    describe('PUT', () => {
      it('updates a sublocation', done => {
        let location = {
          name: 'Nairobi Test3',
          female: 50,
          male: 10,
        }
        let subLocation = {
          name: 'subNairobi2',
          female: 50,
          male: 10,
        }
        let updateSubLocation = {
          name: 'subNairobi3',
          female: 1000,
          male: 10,
        }
        request(app)
          .post('/api/location')
          .send(location)
          .expect(201)
          .then((err, res) => {
            request(app)
              .post(`/api/location/${err.body.data._id}/sub/`)
              .send(subLocation)
              .expect(201)
              .then((res, err) => {
                request(app)
                  .put(
                    `/api/location/${res.body.data.location}/sub/${
                      res.body.data._id
                    }`
                  )
                  .send(updateSubLocation)
                  .expect(200)
                  .then((res, err) => {
                    expect(res.body.message).to.equal('successfully updated')
                    done()
                  })
              })
          })
      })
    })

    describe('DELETE', () => {
      it('deletes a sublocation', done => {
        let location = {
          name: 'Nairobi Test4',
          female: 50,
          male: 10,
        }
        let subLocation = {
          name: 'subNairobi4',
          female: 50,
          male: 10,
        }

        request(app)
          .post('/api/location')
          .send(location)
          .expect(201)
          .then((err, res) => {
            request(app)
              .post(`/api/location/${err.body.data._id}/sub/`)
              .send(subLocation)
              .expect(201)
              .then((res, err) => {
                request(app)
                  .delete(
                    `/api/location/${res.body.data.location}/sub/${
                      res.body.data._id
                    }`
                  )
                  .send()
                  .expect(200)
                  .then((res, err) => {
                    expect(res.body.message).to.contain(`has been deleted`)
                    done()
                  })
              })
          })
      })

      it('doesnt delete a nonexistent sublocation', done => {
        let location = {
          name: 'Nairobi Test5',
          female: 50,
          male: 10,
        }
        let subLocation = {
          name: 'subNairobi5',
          female: 50,
          male: 10,
        }

        request(app)
          .post('/api/location')
          .send(location)
          .expect(201)
          .then((err, res) => {
            request(app)
              .post(`/api/location/${err.body.data._id}/sub/`)
              .send(subLocation)
              .expect(201)
              .then((res, err) => {
                console.log(res)

                request(app)
                  .delete(
                    `/api/location/${
                      res.body.data.location
                    }/sub/5c9ce785e21ec7d3cfba88b7`
                  )
                  .send()
                  .expect(404)
                  .then((res, err) => {
                    expect(res.body.message).to.equal(
                      `SubLocation with Id: 5c9ce785e21ec7d3cfba88b7 doesn't exist`
                    )
                    done()
                  })
              })
          })
      })
    })
  })
})
