/**
 * @apiDefine version
 * @apiVersion 0.0.0
 */

import Koa from 'koa'
import convert from 'koa-convert'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

import mongoose from 'mongoose'

import config from 'config'

import jwt from 'koa-jwt'
import { login, signup } from './auth'

import db from './domain'

import graphqlhttp from 'koa-graphql'
import Schema from './graphql'

const app = new Koa()
const health = new Router()
const public_ = new Router()
const protected_ = new Router()

mongoose.Promise = global.Promise
mongoose.connect(`${config.dbUrl}:${config.dbPort}`)

app.use(bodyParser())

/**
 * @api {get} / health
 * @apiGroup Misc
 * @apiName Health
 * @apiPermission none
 *
 * @apiUse version
 *
 * @apiSuccess {string} status Status of the api.
 */
health
  .get(
    '/',
    (ctx) =>
      ctx.body = {status: 'up'}
  )

public_
  /**
   * @api {post} /login login
   * @apiGroup Auth
   * @apiName Login
   * @apiPermission none
   *
   * @apiUse version
   *
   * @apiParam {string} username The username of the user that requests the login.
   * @apiParam {string} password The password of the user that requests the login.
   *
   * @apiError (401 Unauthorized) {string} message What went wrong during the login.
   *
   * @apiSuccess {string} message A message containing info regarding login status.
   * @apiSuccess {string} token The JWT token representing the user.
   */
  .post(
    '/login',
    login,
  )
  .all(
    '/__graphql',
    convert(
      graphqlhttp({
        schema: Schema,
        graphiql: true,
      })
    )
  )
  /**
   * @api {post} /signup signup
   * @apiGroup Auth
   * @apiName Sign Up
   * @apiPermission none
   *
   * @apiUse version
   *
   * @apiParam {string} username The username of the user to be created. Should be unique,
   * @apiParam {string} password The password of the user to be created.
   * @apiParam {string} email The email of the user to be created. Should be unique.
   * @apiParam {string} dateOfBirth The date of birth of the user to be created. Uses JS dates. (e.g. "Tue Apr 04 2017 22:34:42 GMT-0400 (EDT)")
   * @apiParam {string} [firstName]
   * @apiParam {string} [lastName]
   * @apiParam {string} [avatar] Url to the avatar of the newly created user.
   *
   * @apiError (401 Unauthorized) {string} message What went wrong during the signup.
   *
   * @apiSuccess {string} message A message containing info regarding login status.
   * @apiSuccess {string} token The JWT token representing the user.
   */
  .post(
    '/signup',
    signup,
  )

protected_
  .get(
    '/me',
    (ctx) => {
      console.log(ctx.state.user)
      const {
        user
      } = ctx.state
      ctx.body = {
        ...user,
        password: '',
        roles: '',
      }
    }
  )
  .all(
    '/graphql',
    convert(
      graphqlhttp({
        schema: Schema,
        graphiql: true,
      })
    )
  )

app.use(health.routes())
app.use(public_.routes())
app.use(jwt({ secret: config.jwtSecret }))

app.use(protected_.routes())

app.listen(config.port, () => {
  console.info(`Listening to http://localhost:${config.get('port')}`)
})