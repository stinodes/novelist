/**
 * @apiDefine version
 * @apiVersion 0.0.0
 */

import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'
import config from 'config'

import db from './domain'
import { login, signup } from './auth'

const app = new Koa()
const health = new Router()
const public_ = new Router()
const protected_ = new Router()

mongoose.Promise = global.Promise
mongoose.connect(`${config.dbUrl}:${config.dbPort}`)

app.use(bodyParser());

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

app.use(health.routes())
app.use(public_.routes())
app.use(protected_.routes())

app.listen(config.port, () => {
  console.info(`Listening to http://localhost:${config.get('port')}`)
})