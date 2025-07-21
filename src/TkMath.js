const HALF_PI = Math.PI / 2
const QUART_PI = Math.PI / 4
const DOUBLE_PI = Math.PI * 2

const _DEG_TO_RAD = Math.PI / 180
const _RAD_TO_DEG = 180 / Math.PI

/**
 * Converts angle value from degree to radian
 * @param {number} [angleDeg]               Angle degree (default: 0)
 * @returns {number}
 */
export function angleDegToRad(angleDeg = 0) {
    return Number(angleDeg) * _DEG_TO_RAD
}

/**
 * Converts angle value from radian to degree
 * @param {number} [angleRad]               Angle radian (default: 0)
 * @returns {number}
 */
export function angleRadToDeg(angleRad = 0) {
    return Number(angleRad) * _RAD_TO_DEG
}

/**
 * Round float number with a given precision
 * @param {number} srcVal                   Float number
 * @param {number} [precision]              Defines the number of decimal points of the result float number (default: 3)
 * @returns {number}
 */
export function roundFloat(srcVal, precision = 3) {
    return Number(srcVal.toFixed(precision))
}

/**
 * Linearly interpolate on interval
 * @param {number} minVal                   Minimum number of interval
 * @param {number} maxVal                   Maximum number of interval
 * @param {number} factor                   Factor interpolate (0 → minimum, 1 → maximum)
 * @returns {number}
 */
export function lerp(minVal, maxVal, factor) {
    return (minVal * (1 - factor)) + (maxVal * factor)
}

/**
 * Calculates the dot product of 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {number}
 */
export function dotProduct2D(ptA, ptB) {
    return (ptA.x * ptB.x) + (ptA.y * ptB.y)
}

/**
 * Calculates the cross product of 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {number}
 */
export function crossProduct2D(ptA, ptB) {
    return (ptA.x * ptB.y) - (ptA.y * ptB.x)
}

/**
 * Calculates the delta between 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {{x:number,y:number}}
 */
export function delta2D(ptA, ptB) {
    return {
        x: ptA.x - ptB.x,
        y: ptA.y - ptB.y
    }
}

/**
 * Calculates the midpoint between 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {{x:number,y:number}}
 */
export function midPoint2D(ptA, ptB) {
    return {
        x: (ptA.x + ptB.x) / 2,
        y: (ptA.y + ptB.y) / 2
    }
}

/**
 * Calculates the point of unit vector for direction point
 * @param {{x:number,y:number}} ptA         Point A
 * @returns {{x:number,y:number}}
 */
export function normalize2D(ptA) {
    const { x, y } = ptA
    const factor = 1 / (Math.sqrt(x * x + y * y) || 1)

    return {
        x: x * factor,
        y: y * factor
    }
}

/**
 * Calculates the normal for line ─ptA─────ptB─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {{x:number,y:number}}
 */
export function normal2D(ptA, ptB) {
    return normalize2D({
        x: ptA.y - ptB.y,
        y: ptB.x - ptA.x
    })
}

/**
 * Calculates the angle clockwise between lines ─ptA─────ptB─ and ─ptB─────ptC─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {boolean} [sign]                  Return angle with a sign (default: false)
 * @returns {number}
 */
export function angleClockwise2D(ptA, ptB, ptC, sign = false) {
    const nAB = normalize2D(delta2D(ptA, ptB))
    const nCB = normalize2D(delta2D(ptC, ptB))

    let angle = Math.acos(dotProduct2D(nAB, nCB))

    if (crossProduct2D(nAB, nCB) < 0) angle *= -1
    if (!sign && (angle < 0)) angle += DOUBLE_PI

    return angle
}

/**
 * Checks is equal coords of 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {number} [tolerance]              Tolerance of match coords (default: 0.1)
 * @returns {boolean}
 */
export function isEqualCoords2D(ptA, ptB, tolerance = 0.1) {
    const delta = delta2D(ptB, ptA)
    return (Math.abs(delta.x) < tolerance) && (Math.abs(delta.y) < tolerance)
}

/**
 * Checks if some point is equal coords of 2D ptA
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}[]} arrPoints Array of check points
 * @param {number} [tolerance]              Tolerance of match coords (default: 0.1)
 * @returns {boolean}
 */
export function isSomeEqualCoords2D(ptA, arrPoints, tolerance = 0.1) {
    return arrPoints.some((pt) => isEqualCoords2D(ptA, pt, tolerance))
}

/**
 * Checks is equal coords of the lines segments ptA─────ptB and ptC─────ptD
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {{x:number,y:number}} ptD         Point D
 * @param {number} [tolerance]              Tolerance of match coords (default: 0.1)
 * @returns {boolean}
 */
export function isEqualLinesSegments2D(ptA, ptB, ptC, ptD, tolerance = 0.1) {
    const isEqual =
        (isEqualCoords2D(ptA, ptC, tolerance) && isEqualCoords2D(ptB, ptD, tolerance)) ||
        (isEqualCoords2D(ptB, ptC, tolerance) && isEqualCoords2D(ptA, ptD, tolerance))

    return isEqual
}

/**
 * Calculates the distance between 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {number}
 */
export function dist2D(ptA, ptB) {
    const delta = delta2D(ptB, ptA)
    return Math.sqrt(delta.x ** 2 + delta.y ** 2)
}

/**
 * Calculates the Manhattan distance between 2D ptA and ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @returns {number}
 */
export function distManhattan2D(ptA, ptB) {
    const delta = delta2D(ptB, ptA)
    return Math.abs(delta.x) + Math.abs(delta.y)
}

/**
 * Checks is point is nearer 2D ptC to ptA than to ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @returns {boolean}
 */
export function isNearerFirstPt2D(ptA, ptB, ptC) {
    return distManhattan2D(ptC, ptA) < distManhattan2D(ptC, ptB)
}

/**
 * Calculation area of triangle 2D
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {boolean} [saveSign]              Save the area sign in the result (default: false)
 * @returns {number}
 */
export function areaTriangle2D(ptA, ptB, ptC, saveSign = false) {
    const area = (((ptB.x - ptA.x) * (ptC.y - ptA.y)) - ((ptC.x - ptA.x) * (ptB.y - ptA.y))) / 2
    return saveSign ? area : Math.abs(area)
}

/**
 * Calculation area of polygon 2D
 * @param {{x:number,y:number}[]} polyPts   Points of polygon
 * @param {boolean} [saveSign]              Save the area sign in the result (default: false)
 * @returns {number}
 */
export function areaPolygon2D(polyPts, saveSign = false) {
    let res = 0

    if (polyPts.length > 3) {
        const area = polyPts.reduce((valArea, ptA, ind) => {
            const ptB = polyPts[(ind + 1) % polyPts.length]
            return valArea + crossProduct2D(ptA, ptB)
        }, 0) / 2

        res = saveSign ? area : Math.abs(area)
    } else if (polyPts.length === 3) {
        res = areaTriangle2D(polyPts[0], polyPts[1], polyPts[2], saveSign)
    }

    return res
}

/**
 * Calculation centroid of polygon 2D
 * @param {{x:number,y:number}[]} polyPts   Points of polygon
 * @returns {{x:number,y:number}}
 */
export function centroidPolygon2D(polyPts) {
    let area = 0

    const centroid = polyPts.reduce((valCentroid, ptA, ind) => {
        const ptB = polyPts[(ind + 1) % polyPts.length]

        const cross = crossProduct2D(ptA, ptB)
        area += cross

        return {
            x: valCentroid.x + ((ptA.x + ptB.x) * cross),
            y: valCentroid.y + ((ptA.y + ptB.y) * cross)
        }
    }, { x: 0, y: 0 })

    const factor = area * 3

    return {
        x: centroid.x / factor,
        y: centroid.y / factor
    }
}

/**
 * Calculates the point 2D on a line lying at a given distance from ptA
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {number} distance                 Distance from ptA
 * @returns {{x:number,y:number}}
 */
export function pointOnLineByLen2D(ptA, ptB, distance) {
    const delta = delta2D(ptB, ptA)
    const factor = distance / (dist2D(ptA, ptB) || 1)

    return {
        x: ptA.x + (delta.x * factor),
        y: ptA.y + (delta.y * factor)
    }
}

/**
 * Calculates the projection of a point 2D ptC onto a straight line ─ptA─────ptB─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @returns {{x:number,y:number}}
 */
export function projectPointToStraightLine2D(ptA, ptB, ptC) {
    const delta = delta2D(ptB, ptA)
    const deltaPointA = delta2D(ptC, ptA)

    const factor = dotProduct2D(deltaPointA, delta) / dotProduct2D(delta, delta)

    return {
        x: ptA.x + (delta.x * factor),
        y: ptA.y + (delta.y * factor)
    }
}

/**
 * Detect the side on which point ptC is located relative to the straight line ─ptA─────ptB─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @returns {number}                        -1, 1, 0 (= located on line)
 */
export function sidePointRelativeStraightLine2D(ptA, ptB, ptC) {
    const doubleArea = crossProduct2D(delta2D(ptB, ptA), delta2D(ptC, ptA))
    return Math.sign(doubleArea)
}

/**
 * Checks if point 2D ptC on straight line ─ptA─────ptB─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {number} [tolerance]              Tolerance of match (default: 1.2)
 * @returns {boolean}
 */
export function isPointBelongStraightLine2D(ptA, ptB, ptC, tolerance = 1.2) {
    const deltaBA = delta2D(ptB, ptA)
    const deltaCA = delta2D(ptC, ptA)

    const doubleArea = crossProduct2D(deltaBA, deltaCA)
    const lengthAB = Math.sqrt(deltaBA.x ** 2 + deltaBA.y ** 2)

    return Math.abs(doubleArea / lengthAB) <= (tolerance / 2)
}

/**
 * Checks if point 2D ptC on line segment ptA─────ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {number} [tolerance]              Tolerance of match (default: 1.2)
 * @returns {boolean}
 */
export function isPointBelongLineSegment2D(ptA, ptB, ptC, tolerance = 1.2) {
    let res = false

    const deltaBA = delta2D(ptB, ptA)
    const sqLengthAB = (deltaBA.x ** 2) + (deltaBA.y ** 2)

    if (sqLengthAB !== 0) {
        const factorBelong = (((ptC.x - ptA.x) * deltaBA.x) + ((ptC.y - ptA.y) * deltaBA.y)) / sqLengthAB

        if (factorBelong < 0) {
            res = Math.sqrt((ptA.x - ptC.x) ** 2 + (ptA.y - ptC.y) ** 2) <= tolerance
        } else if (factorBelong > 1) {
            res = Math.sqrt((ptB.x - ptC.x) ** 2 + (ptB.y - ptC.y) ** 2) <= tolerance
        } else {
            const factorLocate = (((ptA.y - ptC.y) * deltaBA.x) - ((ptA.x - ptC.x) * deltaBA.y)) / sqLengthAB
            res = Math.abs(factorLocate) * Math.sqrt(sqLengthAB) <= tolerance
        }
    }

    return res
}

/**
 * Checks if some point 2D on line segment ptA─────ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}[]} arrPoints Array of check points
 * @param {number} [tolerance]              Tolerance of match (default: 1.2)
 * @returns {boolean}
 */
export function isSomePointBelongLineSegment2D(ptA, ptB, arrPoints, tolerance = 1.2) {
    return arrPoints.some((pt) => isPointBelongLineSegment2D(ptA, ptB, pt, tolerance))
}

/**
 * Checks if every point 2D on line segment ptA─────ptB
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}[]} arrPoints Array of check points
 * @param {number} [tolerance]              Tolerance of match (default: 1.2)
 * @returns {boolean}
 */
export function isEveryPointBelongLineSegment2D(ptA, ptB, arrPoints, tolerance = 1.2) {
    return arrPoints.every((pt) => isPointBelongLineSegment2D(ptA, ptB, pt, tolerance))
}

/**
 * Checks if point 2D ptA inside in polygon
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}[]} polyPts   Points of polygon
 * @returns {boolean}
 */
export function isPointInsidePolygon2D(ptA, polyPts) {
    let isInside = false

    for (let i = 0, j = polyPts.length - 1; i < polyPts.length; j = i++) {
        const pt1 = polyPts[i]
        const pt2 = polyPts[j]

        const isIntersect =
            ((pt1.y > ptA.y) !== (pt2.y > ptA.y)) &&
            (ptA.x < (pt2.x - pt1.x) * (ptA.y - pt1.y) / (pt2.y - pt1.y) + pt1.x)

        if (isIntersect) isInside = !isInside
    }

    return isInside
}

/**
 * Checks if some point 2D inside in polygon
 * @param {{x:number,y:number}[]} arrPoints Array of check points
 * @param {{x:number,y:number}[]} polyPts   Points of polygon
 * @returns {boolean}
 */
export function isSomePointInsidePolygon2D(arrPoints, polyPts) {
    return arrPoints.some((pt) => isPointInsidePolygon2D(pt, polyPts))
}

/**
 * Checks if every point 2D inside in polygon
 * @param {{x:number,y:number}[]} arrPoints Array of check points
 * @param {{x:number,y:number}[]} polyPts   Points of polygon
 * @returns {boolean}
 */
export function isEveryPointInsidePolygon2D(arrPoints, polyPts) {
    return arrPoints.every((pt) => isPointInsidePolygon2D(pt, polyPts))
}

/**
 * Checks if parallel of the straight lines ─ptA─────ptB─ and ─ptC─────ptD─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {{x:number,y:number}} ptD         Point D
 * @param {number} [tolerance]              Tolerance of parallel: 0 - exact match, 1 - orthogonal (default: 0.1)
 * @returns {boolean}
 */
export function isParallelStraightLines2D(ptA, ptB, ptC, ptD, tolerance = 0.1) {
    const deltaBA = normalize2D(delta2D(ptB, ptA))
    const deltaDC = normalize2D(delta2D(ptD, ptC))

    const denominator = crossProduct2D(deltaBA, deltaDC)
    return Math.abs(denominator) <= Math.sin(HALF_PI * tolerance)
}

/**
 * Calculates the cross point 2D of the straight lines ─ptA─────ptB─ and ─ptC─────ptD─
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {{x:number,y:number}} ptD         Point D
 * @returns {{x:number,y:number}|undefined}
 */
export function crossStraightLines2D(ptA, ptB, ptC, ptD) {
    const factor = _getFactorCrossLines2D(ptA, ptB, ptC, ptD)
    if (factor) {
        return _getPointByFactorCross2D(factor, ptA, ptB)
    }
}

/**
 * Calculates the cross point 2D of the lines segments ptA─────ptB and ptC─────ptD
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {{x:number,y:number}} ptD         Point D
 * @returns {{x:number,y:number}|undefined}
 */
export function crossLinesSegments2D(ptA, ptB, ptC, ptD) {
    const factor = _getFactorCrossLines2D(ptA, ptB, ptC, ptD)
    if (_isScopeFactorCross2D(factor)) {
        return _getPointByFactorCross2D(factor, ptA, ptB)
    }
}

/**
 * Checks if crossed of the lines segments ptA─────ptB and ptC─────ptD
 * @param {{x:number,y:number}} ptA         Point A
 * @param {{x:number,y:number}} ptB         Point B
 * @param {{x:number,y:number}} ptC         Point C
 * @param {{x:number,y:number}} ptD         Point D
 * @returns {boolean}
 */
export function isCrossLinesSegments2D(ptA, ptB, ptC, ptD) {
    const factor = _getFactorCrossLines2D(ptA, ptB, ptC, ptD)
    return _isScopeFactorCross2D(factor) === true
}

function _getFactorCrossLines2D(ptA, ptB, ptC, ptD) {
    let res = null

    if (ptA && ptB && ptC && ptD) {
        const deltaAB = delta2D(ptA, ptB)
        const deltaDC = delta2D(ptD, ptC)

        const cross = crossProduct2D(deltaAB, deltaDC)
        if (cross !== 0) {

            const deltaDB = delta2D(ptD, ptB)
            res = {
                Ua: crossProduct2D(deltaDB, deltaDC) / cross,
                Ub: crossProduct2D(deltaAB, deltaDB) / cross
            }
        }
    }

    return res
}

function _isScopeFactorCross2D(factor) {
    return factor && (factor.Ua >= 0) && (factor.Ua <= 1) && (factor.Ub >= 0) && (factor.Ub <= 1)
}

function _getPointByFactorCross2D(factor, ptA, ptB) {
    return {
        x: (ptA.x * factor.Ua) + (ptB.x * (1 - factor.Ua)),
        y: (ptA.y * factor.Ua) + (ptB.y * (1 - factor.Ua))
    }
}

/**
 * Detect of continuous chains for a set of line segments
 * @param {[{x:number,y:number},{x:number,y:number}][]} arrLines    Array of lines segments
 * @param {boolean} [continuityCoords]                              Changing source coordinates for segments continuity (default: false)
 * @param {number} [tolerance]                                      Tolerance of match coords (default: 0.1)
 * @returns {{inds:number[],closed:boolean}[]}
 */
export function chainsLinesSegments2D(arrLines, continuityCoords = false, tolerance = 0.1) {
    let chains = []

    arrLines.forEach((base, indBase) => {
        const isAdded = chains.some((chain) => {
            return chain.some((indLine, ind) => {
                return _joinCoords2D(base, arrLines[indLine], tolerance, (isBefore) => {
                    chain.splice(ind + (isBefore ? 0 : 1), 0, indBase)
                })
            })
        })

        if (!isAdded) chains.push([indBase])
    })

    if (chains.length > 1) {
        chains = _joinChains2D(chains, arrLines, tolerance)
    }

    return chains.map((inds) => {
        if (continuityCoords) {
            inds.forEach((indCurr, ind) => {
                const indNext = ind < inds.length - 1 ? inds[ind + 1] : inds[0]

                const [ptA, ptB] = arrLines[indNext]
                const [ptC] = arrLines[indCurr]

                if (isNearerFirstPt2D(ptB, ptA, ptC)) {
                    arrLines[indNext][0] = ptB
                    arrLines[indNext][1] = ptA
                }
            })
        }

        const { first, last } = _getChainEnds(arrLines, inds)
        const closed = (inds.length > 2) && _joinCoords2D(first, last, tolerance)

        return { inds, closed }
    })
}

function _joinChains2D(chains, arrLines, tolerance) {
    const joinedChains = chains.filter((base, indBase) => {

        let isJoined = false
        const endsBase = _getChainEnds(arrLines, base)

        for (let indCheck = indBase + 1; indCheck < chains.length; indCheck++) {
            const check = chains[indCheck]
            const endsCheck = _getChainEnds(arrLines, check)

            isJoined =
                _joinCoords2D(endsBase.first, endsCheck.last, tolerance, () => check.push(...base)) ||
                _joinCoords2D(endsBase.last, endsCheck.first, tolerance, () => check.unshift(...base)) ||
                _joinCoords2D(endsBase.last, endsCheck.last, tolerance, () => check.push(...base.reverse())) ||
                _joinCoords2D(endsBase.first, endsCheck.first, tolerance, () => check.unshift(...base.reverse()))

            if (isJoined) break
        }

        return !isJoined
    })

    return joinedChains
}

function _joinCoords2D(pointsBase, pointsCheck, tolerance, cbAction = (isBefore) => {}) {
    let res = true

    const [basePtA, basePtB] = pointsBase

    if (isSomeEqualCoords2D(basePtA, pointsCheck, tolerance)) cbAction(true)
    else if (isSomeEqualCoords2D(basePtB, pointsCheck, tolerance)) cbAction(false)
    else res = false

    return res
}

function _getChainEnds(coords, chain) {
    return {
        first: coords[chain[0]],
        last: coords[chain[chain.length - 1]]
    }
}

export default { HALF_PI, QUART_PI, DOUBLE_PI, angleDegToRad, angleRadToDeg, roundFloat, lerp, dotProduct2D, crossProduct2D, delta2D, midPoint2D, normalize2D, normal2D, angleClockwise2D, isEqualCoords2D, isSomeEqualCoords2D, isEqualLinesSegments2D, dist2D, distManhattan2D, isNearerFirstPt2D, areaTriangle2D, areaPolygon2D, centroidPolygon2D, pointOnLineByLen2D, projectPointToStraightLine2D, sidePointRelativeStraightLine2D, isPointBelongStraightLine2D, isPointBelongLineSegment2D, isSomePointBelongLineSegment2D, isEveryPointBelongLineSegment2D, isPointInsidePolygon2D, isSomePointInsidePolygon2D, isEveryPointInsidePolygon2D, isParallelStraightLines2D, crossStraightLines2D, crossLinesSegments2D, isCrossLinesSegments2D, chainsLinesSegments2D }